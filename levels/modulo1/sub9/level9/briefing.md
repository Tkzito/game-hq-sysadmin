# Mission: Simulating SQL JOIN in Bash

Welcome, operator. In database work, combining data from two tables is done using a JOIN operation. In this level, you must implement a JOIN operation between two CSV files.

## Objectives

Create a bash script at `/home/operator/join_data.sh` that joins `/home/operator/users.csv` and `/home/operator/departments.csv` on the matching `dept_id` column.

## Requirements

1. The script must parse `/home/operator/users.csv` and `/home/operator/departments.csv`.
2. The output format for each user record must be exactly `username:dept_name`, one per line.
3. The output must be sorted alphabetically by `username`.
4. The header lines must be ignored in the output.
5. Ensure the script is executable: `chmod +x /home/operator/join_data.sh`.

> [!TIP]
> You can use the `join` utility (which requires sorting both files first by the join column), or implement the logic using associative arrays in `awk` or bash.

## Example Output

```text
alice:Engineering
bob:Marketing
charlie:Engineering
```

Good luck!
