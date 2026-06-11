# Level 94: dialog Confirmation (yesno)

Now that you know how to display messages, let's look at capturing user confirmation. The `--yesno` box presents a question with "Yes" and "No" buttons, and returns different exit status codes based on the selection.

## Your Task

Create a Bash script at `/home/operator/confirm.sh` that:
1. Displays a `--yesno` dialog box.
2. Title: "Confirmation" (using `--title "Confirmation"`).
3. Text: "Do you want to clear the system logs?".
4. Size: Height `8`, Width `40`.
5. Capture the exit status code of the `dialog` command:
   - If the user selects **Yes** (exit code `0`), write `logs cleared` to `/home/operator/action.log`.
   - If the user selects **No** or cancels (any non-zero exit code), write `action cancelled` to `/home/operator/action.log`.
6. Make sure the script is executable.

Good luck!
