# Level 93: Welcome to dialog

The command-line is powerful, but sometimes a Text User Interface (TUI) makes interaction much friendlier. The `dialog` tool allows us to build clean, menu-driven interfaces.

In this level, you will create a simple welcome box.

## Your Task

Create a Bash script at `/home/operator/welcome.sh` that:
1. Uses `dialog` to display a message box (`--msgbox`).
2. Sets the title of the dialog to `Welcome` (using `--title "Welcome"`).
3. The body of the message box must be `Welcome to Game HQ Ops Dashboard`.
4. The box dimensions must be `8` rows high and `50` columns wide.
5. Make sure the script is executable.

You can test running it with:
```bash
./welcome.sh
```
Note: In some terminal environments without a clean tty, you can redirect the output or run with standard TERM variables.

Let's do this!
