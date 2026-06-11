# Level 100: TUI Dashboard

Welcome to the final level! You are going to build a fully functional terminal dashboard console. This combines your knowledge of loops, commands output redirection, and multiple interactive `dialog` boxes.

## Your Task

Create a Bash script at `/home/operator/dashboard.sh` that:
1. Implements a continuous loop displaying a main menu.
2. Main Menu:
   - Uses `dialog --menu`.
   - Title: "TUI Ops Dashboard" (using `--title "TUI Ops Dashboard"`).
   - Text: "Select a dashboard view:".
   - Dimensions: Height `15`, Width `50`, Menu-Height `5`.
   - Options:
     - `1` : "System Stats (uptime & df)"
     - `2` : "Active Processes"
     - `3` : "Network Interfaces"
     - `4` : "Exit"
3. Action Handling:
   - **Option 1**: Show a `--msgbox` with title `System Stats` (dimensions: height `15`, width `60`) containing the output of both `uptime` and `df -h`.
   - **Option 2**: Show a `--msgbox` with title `Active Processes` (dimensions: height `15`, width `60`) containing the output of `ps` (limit to first 10 lines, e.g. `ps | head -n 10` or `ps aux | head -n 10`).
   - **Option 3**: Show a `--msgbox` with title `Network Interfaces` (dimensions: height `15`, width `60`) containing the output of `ip link` or `ifconfig` (use `ip link` or `ifconfig`, whichever is available).
   - **Option 4** (or menu cancel/escape): Exit the loop and end the script.
4. Make sure the script is executable.

Good luck on this final mission!
