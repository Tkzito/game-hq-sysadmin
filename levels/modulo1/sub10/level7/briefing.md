# Level 97: dialog Checklist Selector (checklist)

Multiple-choice selectors are great for configuration settings or picking targets for bulk tasks. The `dialog --checklist` box enables the user to toggle multiple items on or off.

## Your Task

Create a Bash script at `/home/operator/backup_select.sh` that:
1. Displays a `--checklist` dialog box.
2. Title: "Backup Targets" (`--title "Backup Targets"`).
3. Text prompt: "Select directories to backup:".
4. Dimensions: Height `15`, Width `50`, List-Height `5`.
5. Provide the following options (tag, description, status):
   - `/etc` : "System configurations" : `on`
   - `/var/log` : "System log files" : `off`
   - `/home` : "User directories" : `on`
6. Capture the user's selections and save them to `/home/operator/backup_targets.txt`.
7. Make sure the script is executable.

Note: Dialog output will contain the selected tags. We will accept targets separated by spaces, quotes, or newlines in the output file, as long as it correctly represents what the user selected.

Good luck!
