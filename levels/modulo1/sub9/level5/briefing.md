# Mission: Deleting Records in CSV

Hello, operator. In this mission, you will implement a delete operation on a CSV database.

## Objectives

Create a bash script at `/home/operator/delete_user.sh` that takes a user `id` as an argument and deletes the corresponding record from `/home/operator/users.csv`.

## Requirements

1. The script usage must be: `/home/operator/delete_user.sh <id>`.
2. It must remove the row matching the exact ID from `/home/operator/users.csv`.
3. Other rows and headers must be preserved exactly as they are.
4. Ensure the script is executable: `chmod +x /home/operator/delete_user.sh`.

## Example

Running:
```bash
/home/operator/delete_user.sh 2
```
Should remove the user record with ID `2` from the database.

Good luck!
