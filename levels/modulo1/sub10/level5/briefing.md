# Level 95: dialog Input Box (inputbox)

Let's prompt the user for input. Unlike GUI applications where input is returned via callbacks, console applications using `dialog` output the input text to standard error (`stderr`, fd 2). Alternatively, you can use the `--stdout` flag to redirect the text output to standard output (`stdout`, fd 1).

## Your Task

Create a Bash script at `/home/operator/ask_name.sh` that:
1. Displays an `--inputbox` dialog box.
2. Title: "Authentication" (using `--title "Authentication"`).
3. Text: "Enter operator name:".
4. Size: Height `8`, Width `40`.
5. Captures the user's input and writes it to `/home/operator/name.txt`.
6. Make sure the script is executable.

### Tips for capturing dialog input:
Using `--stdout`:
```bash
username=$(dialog --title "Authentication" --inputbox "Enter operator name:" 8 40 3>&1 1>&2 2>&3)
# Or simply:
username=$(dialog --stdout --title "Authentication" --inputbox "Enter operator name:" 8 40)
```
Using redirection:
```bash
dialog --title "Authentication" --inputbox "Enter operator name:" 8 40 2> /home/operator/name.txt
```

Good luck!
