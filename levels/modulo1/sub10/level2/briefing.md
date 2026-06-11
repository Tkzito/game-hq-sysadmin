# Level 92: Formatting with tput

A good terminal UI starts with dynamic positioning. Hardcoding spaces or cursor positions makes tools look broken on resized windows.

Your mission is to write a script that centers a status message in the terminal window dynamically, regardless of its size.

## Your Task

Create a Bash script at `/home/operator/center.sh` that:
1. Clears the screen using `tput clear`.
2. Queries the terminal's columns and lines dynamically using `tput cols` and `tput lines`.
3. Calculates the coordinates to center the message `SYSTEM ONLINE` (13 characters long) both vertically and horizontally.
   - Horizontal position: `(columns - 13) / 2`
   - Vertical position: `lines / 2`
4. Positions the cursor using `tput cup <line> <column>` (remember `tput cup` accepts `line` first, then `column`, 0-indexed).
5. Prints the text `SYSTEM ONLINE`.
6. Make sure the script is executable.

To test your script locally, you can run:
```bash
TERM=xterm ./center.sh
```

Ensure you use `tput` commands to do this, as the validator will inspect both the output sequences and the commands used in the script.
