# Mission: Database Archiving and Cleanup

Welcome, operator. Databases and application systems generate log files and audits constantly. Over time, these files consume disk space, so we need to archive and rotate them regularly.

## Objectives

Create a bash script at `/home/operator/archive_db.sh` that identifies old or large log files in `/home/operator/db/`, archives them in `/home/operator/archive/backup.tar.gz`, and deletes the original files.

## Requirements

1. The script must process files ending with `.log` inside `/home/operator/db/`. Do not touch files with other extensions (such as `.csv`).
2. A `.log` file must be archived and cleaned up if it meets at least one of these criteria:
   - **Age**: The file modification time is older than 30 days (i.e. `-mtime +30`).
   - **Size**: The file is larger than 10 Kilobytes (10240 bytes).
3. The matching files must be compressed into a single tarball at `/home/operator/archive/backup.tar.gz`.
4. After creating the archive, delete the original archived files from `/home/operator/db/`.
5. Non-matching files (like `system_active.log` which is small and recent, or `users.csv` which is old but not a `.log` file) must remain untouched in `/home/operator/db/`.
6. Ensure the script is executable: `chmod +x /home/operator/archive_db.sh`.

Good luck!
