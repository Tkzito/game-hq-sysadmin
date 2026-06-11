# Mission: Updating Records in CSV

Welcome back, operator. You are assigned to update the records in a CSV database.

## Objectives

Create a bash script at `/home/operator/update_role.sh` that searches for a user by their `username` in `/home/operator/users.csv` and updates their `role` to the specified value.

## Requirements

1. The script usage must be: `/home/operator/update_role.sh <username> <new_role>`.
2. The script must modify the file in-place or update it by replacing `/home/operator/users.csv` safely.
3. Only the matching user's role should be updated; all other fields and lines must remain unchanged.
4. Ensure the script is executable: `chmod +x /home/operator/update_role.sh`.

## Example

Running:
```bash
/home/operator/update_role.sh bob admin
```
Should update the file so that bob's role changes from `user` to `admin`.

Good luck!
