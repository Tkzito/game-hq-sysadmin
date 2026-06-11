#!/bin/bash

SCRIPT="/home/operator/cgi-bin/query.cgi"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# Function to run with env and check output
validate_query() {
    local qs="$1"
    local expected_user="$2"
    local expected_action="$3"
    
    local out
    out=$(env QUERY_STRING="$qs" "$SCRIPT" 2>&1)
    local code=$?
    
    if [ $code -ne 0 ]; then
        echo "ERROR: Script failed with exit code $code when QUERY_STRING='$qs'."
        exit 1
    fi
    
    # Check headers
    local first_line
    first_line=$(echo "$out" | head -n 1 | tr -d '\r')
    if [[ ! "$first_line" =~ ^[Cc]ontent-[Tt]ype:\ *text/plain ]]; then
        echo "ERROR: Expected Content-type: text/plain for query '$qs'."
        exit 1
    fi
    
    # Check body values
    if ! echo "$out" | grep -F "User: $expected_user" >/dev/null; then
        echo "ERROR: Expected 'User: $expected_user' for query '$qs'."
        exit 1
    fi
    
    if ! echo "$out" | grep -F "Action: $expected_action" >/dev/null; then
        echo "ERROR: Expected 'Action: $expected_action' for query '$qs'."
        exit 1
    fi
}

# Run tests
validate_query "user=Jane&action=cleanup" "Jane" "cleanup"
validate_query "action=status" "unknown" "status"
validate_query "user=Bob" "Bob" "unknown"
validate_query "" "unknown" "unknown"
validate_query "action=deploy&user=Agent47" "Agent47" "deploy"

echo "SUCCESS: CGI query string parser works perfectly!"
exit 0
