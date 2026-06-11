#!/bin/bash

SCRIPT="/home/operator/center.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# Check if script contains tput calls
if ! grep -q "tput cols" "$SCRIPT" && ! grep -q "COLS" "$SCRIPT"; then
    echo "ERROR: Script must query columns dynamically (e.g. using tput cols)."
    exit 1
fi

if ! grep -q "tput lines" "$SCRIPT" && ! grep -q "LINES" "$SCRIPT"; then
    echo "ERROR: Script must query lines dynamically (e.g. using tput lines)."
    exit 1
fi

if ! grep -q "tput cup" "$SCRIPT"; then
    echo "ERROR: Script must use tput cup to position the cursor."
    exit 1
fi

# Run the script under mocked environment
# export TERM, COLUMNS, LINES
export TERM=xterm
export COLUMNS=80
export LINES=24

OUTPUT=$(env TERM=xterm COLUMNS=80 LINES=24 "$SCRIPT" 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo "ERROR: Script failed to run with exit code $EXIT_CODE."
    exit 1
fi

if ! echo "$OUTPUT" | grep -F "SYSTEM ONLINE" >/dev/null; then
    echo "ERROR: Output does not contain 'SYSTEM ONLINE'."
    exit 1
fi

echo "SUCCESS: tput centering verified!"
exit 0
