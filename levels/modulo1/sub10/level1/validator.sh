#!/bin/bash

SCRIPT="/home/operator/colorize.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# Execute script and capture output (preserving escape codes)
OUTPUT=$("$SCRIPT" 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo "ERROR: Script exited with non-zero code $EXIT_CODE."
    exit 1
fi

# Read output line by line and validate
INFO_FOUND=0
WARN_FOUND=0
ERROR_FOUND=0

# Let's save output to a temp file to read reliably line by line
TMP_OUT=$(mktemp)
echo "$OUTPUT" > "$TMP_OUT"

while IFS= read -r line; do
    # Strip carriage returns if any
    line=$(echo "$line" | tr -d '\r')
    
    if echo "$line" | grep -F "[INFO]" >/dev/null; then
        # Check for green code: 32m (e.g. \e[32m or \033[32m)
        if ! echo "$line" | grep -E '\x1b\[32m|\033\[32m|\\e\[32m' >/dev/null; then
            # Maybe they echoed literal \e[32m with echo -e or raw escape chars.
            # Let's check using printf representation of ESC (char 27 or 033 or 1b)
            # Let's test with regex checking for ESC[32m
            if ! printf "%s" "$line" | grep -E $'\x1b\[32m' >/dev/null; then
                echo "ERROR: INFO line lacks green escape code."
                rm "$TMP_OUT"
                exit 1
            fi
        fi
        # Check reset
        if ! printf "%s" "$line" | grep -E $'\x1b\[0m' >/dev/null; then
            echo "ERROR: INFO line lacks reset escape code."
            rm "$TMP_OUT"
            exit 1
        fi
        INFO_FOUND=1
    elif echo "$line" | grep -F "[WARN]" >/dev/null; then
        if ! printf "%s" "$line" | grep -E $'\x1b\[33m' >/dev/null; then
            echo "ERROR: WARN line lacks yellow escape code."
            rm "$TMP_OUT"
            exit 1
        fi
        if ! printf "%s" "$line" | grep -E $'\x1b\[0m' >/dev/null; then
            echo "ERROR: WARN line lacks reset escape code."
            rm "$TMP_OUT"
            exit 1
        fi
        WARN_FOUND=1
    elif echo "$line" | grep -F "[ERROR]" >/dev/null; then
        if ! printf "%s" "$line" | grep -E $'\x1b\[31m' >/dev/null; then
            echo "ERROR: ERROR line lacks red escape code."
            rm "$TMP_OUT"
            exit 1
        fi
        if ! printf "%s" "$line" | grep -E $'\x1b\[0m' >/dev/null; then
            echo "ERROR: ERROR line lacks reset escape code."
            rm "$TMP_OUT"
            exit 1
        fi
        ERROR_FOUND=1
    fi
done < "$TMP_OUT"

rm "$TMP_OUT"

if [ $INFO_FOUND -eq 0 ] || [ $WARN_FOUND -eq 0 ] || [ $ERROR_FOUND -eq 0 ]; then
    echo "ERROR: Not all log severities (INFO, WARN, ERROR) were found in output."
    exit 1
fi

echo "SUCCESS: Log colorizer works perfectly!"
exit 0
