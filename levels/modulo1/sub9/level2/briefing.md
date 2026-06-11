# Mission: Filtering CSV Database

Welcome back, operator. For this assignment, you need to filter a comma-separated database (`/home/operator/users.csv`).

## Objectives

Create a bash script at `/home/operator/find_admins.sh` that parses `/home/operator/users.csv` and finds all records where the role is `admin`.

## Requirements

1. The script must parse `/home/operator/users.csv`.
2. The output format for each matching administrator must be exactly `id:username:email`, one per line.
3. The script must be executable: `chmod +x /home/operator/find_admins.sh`.

## Example Output

```text
1:alice:alice@example.com
4:david:david@example.com
```

Good luck!
