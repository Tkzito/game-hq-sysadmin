# Mission: Handling Quotes and Spaces in CSV

Welcome, operator. A common challenge in CSV parsing is dealing with fields that contain spaces, quotes, or commas themselves. Naive parsing with `cut` or splitting by comma will fail if a column contains commas inside double quotes.

## Objectives

Create a bash script at `/home/operator/parse_complex.sh` that safely parses `/home/operator/users.csv` and outputs each record in the format `id:name:comment`.

## Requirements

1. The script must parse `/home/operator/users.csv` correctly, taking into account that fields are quoted and may contain commas (e.g. `"Active, has access"`).
2. The output format for each user record must be exactly `id:name:comment`, with the outer quotes removed.
3. The header line must be skipped.
4. Ensure the script is executable: `chmod +x /home/operator/parse_complex.sh`.

> [!TIP]
> Python 3 is installed in this container image. You can write a shell script that invokes Python's standard `csv` module to easily and safely parse the CSV file.

## Example Output

```text
1:Alice Smith:Active, has access
2:Bob Jones:On vacation
3:Charlie Brown:Enjoys coding
```

Good luck!
