# Level 96: System Maintenance Menu (menu)

Interactive command-line menus are the core of admin consoles. The `dialog --menu` command allows us to list options and retrieve the tag corresponding to the user's choice.

## Your Task

Create a Bash script at `/home/operator/menu.sh` that:
1. Displays a `--menu` dialog.
2. Title: "Maintenance Menu" (`--title "Maintenance Menu"`).
3. Text prompt: "Select a maintenance task:".
4. Dimensions: Height `15`, Width `50`, Menu-Height `5`.
5. Provide the following menu items (tag and description):
   - `1` : "Show system disk space"
   - `2` : "Show memory usage"
   - `3` : "Restart services"
6. Execute the task based on the user's selection and write the command output to `/home/operator/maintenance.log`:
   - For option `1`: Run `df -h` and write the output.
   - For option `2`: Run `free -m` and write the output.
   - For option `3`: Write `Services restarted` to the file.
7. Make sure the script is executable.

Good luck!
