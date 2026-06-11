# Mission: Parsing CSV Database

Welcome, operator. In this level, you need to parse a simple comma-separated database (`/home/operator/users.csv`).

## Objectives

Create a bash script at `/home/operator/parse.sh` that reads `/home/operator/users.csv` and outputs each user's username and email in the format `username:email`.

## Requirements

1. The script must skip the CSV header line (`id,username,email,role`).
2. The output format for each user record must be exactly `username:email`, one per line.
3. The script must be executable: `chmod +x /home/operator/parse.sh`.

## Example Output

```text
alice:alice@example.com
bob:bob@example.com
charlie:charlie@example.com
```

Good luck!
