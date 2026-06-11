# Level 91: ANSI Escape Codes for Colors

Welcome to the monitoring desk, Operator! Our system logs are currently plain text and hard to scan for anomalies. We need you to write a script that reads log lines and highlights them dynamically based on their severity.

## Your Task

Create a Bash script at `/home/operator/colorize.sh` that:
1. Reads `/home/operator/logs.txt` line by line.
2. Identifies the log level:
   - Lines with `[INFO]` must be printed in **Green**.
   - Lines with `[WARN]` must be printed in **Yellow**.
   - Lines with `[ERROR]` must be printed in **Red**.
3. Resets the terminal color at the end of each line so it doesn't spill over.
4. Uses standard ANSI escape codes (e.g., `\e[32m`, `\e[33m`, `\e[31m`, and `\e[0m` for reset).

Make sure the script is executable (`chmod +x /home/operator/colorize.sh`).

## Example Colored Line

- Green Info line: `\e[32m[INFO] System booted successfully.\e[0m`
- Yellow Warn line: `\e[33m[WARN] Low disk space on /dev/sda1.\e[0m`
- Red Error line: `\e[31m[ERROR] Failed to bind to port 80.\e[0m`

Good luck!
