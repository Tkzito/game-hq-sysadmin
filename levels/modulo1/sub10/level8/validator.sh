#!/bin/bash

SCRIPT="/home/operator/cgi-bin/stats.cgi"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# Run the CGI script and capture output
OUTPUT=$("$SCRIPT" 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo "ERROR: CGI script exited with non-zero status $EXIT_CODE."
    exit 1
fi

# Validate headers
# The first line should be Content-type: text/html
FIRST_LINE=$(echo "$OUTPUT" | head -n 1 | tr -d '\r')
if [[ ! "$FIRST_LINE" =~ ^[Cc]ontent-[Tt]ype:\ *text/html ]]; then
    echo "ERROR: First line of output must be Content-type: text/html. Got: '$FIRST_LINE'"
    exit 1
fi

# Check for the blank line after header
# We can check using awk to see if the second line is blank, or if there is a blank line before HTML
BLANK_LINE_OK=0
# Read line by line to verify the header separator
LINE_COUNT=0
while IFS= read -r line; do
    line=$(echo "$line" | tr -d '\r')
    LINE_COUNT=$((LINE_COUNT + 1))
    if [ $LINE_COUNT -eq 2 ]; then
        if [ -z "$line" ]; then
            BLANK_LINE_OK=1
        fi
        break
    fi
done <<< "$OUTPUT"

if [ $BLANK_LINE_OK -ne 1 ]; then
    echo "ERROR: There must be a blank line immediately following the Content-type header."
    exit 1
fi

# Validate HTML contents
if ! echo "$OUTPUT" | grep -i "<h1>System Statistics</h1>" >/dev/null; then
    echo "ERROR: Heading <h1>System Statistics</h1> not found in HTML output."
    exit 1
fi

if ! echo "$OUTPUT" | grep -i "<pre>" >/dev/null || ! echo "$OUTPUT" | grep -i "</pre>" >/dev/null; then
    echo "ERROR: Output does not contain <pre> blocks wrapping system stats."
    exit 1
fi

# Check if uptime and df -h output exists in output
if ! echo "$OUTPUT" | grep -E "load average:|Filesystem" >/dev/null; then
    echo "ERROR: Output does not seem to contain results from uptime or df -h."
    exit 1
fi

echo "SUCCESS: Basic CGI script is perfectly constructed!"
exit 0
