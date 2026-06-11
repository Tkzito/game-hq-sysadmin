# Mission: Parsing Tab-Separated Values (TSV)

Welcome back, operator. CSV databases are common, but Tab-Separated Values (TSV) are also widely used, especially in log exports and data analysis.

## Objectives

Create a bash script at `/home/operator/get_sales.sh` that takes a `date` (format `YYYY-MM-DD`) as an argument, filters the `/home/operator/sales.tsv` file, and prints the product name and amount of the sales matching that date.

## Requirements

1. The script usage must be: `/home/operator/get_sales.sh <date>`.
2. The columns in `/home/operator/sales.tsv` are separated by tab characters (`\t`).
3. The output format for each matching record must be exactly `product:amount`, one per line.
4. Ensure the script is executable: `chmod +x /home/operator/get_sales.sh`.

## Example

Running:
```bash
/home/operator/get_sales.sh 2026-06-11
```
Should output:
```text
Widget B:200.00
Widget C:50.00
```

Good luck!
