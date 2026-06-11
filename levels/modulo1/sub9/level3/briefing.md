# Mission: Appending Records with Auto-Increment ID

Welcome, operator. In this level, you will learn to implement insert operations with auto-increment keys in a CSV database.

## Objectives

Create a bash script at `/home/operator/add_user.sh` that takes three arguments: `username`, `email`, and `role`, auto-increments the ID, and appends the new record to `/home/operator/users.csv`.

## Requirements

1. The script usage must be: `/home/operator/add_user.sh <username> <email> <role>`.
2. The script must parse the current `/home/operator/users.csv` to find the last ID, increment it by 1, and use it as the new ID.
3. The new line appended must be formatted as: `<id>,<username>,<email>,<role>`.
4. Ensure the script is executable: `chmod +x /home/operator/add_user.sh`.

## Example

Running:
```bash
/home/operator/add_user.sh frank frank@example.com user
```
Will result in the following line appended to `/home/operator/users.csv`:
```text
3,frank,frank@example.com,user
```

Good luck!
