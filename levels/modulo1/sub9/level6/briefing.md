# Mission: Concurrency Lockfile

Hello, operator. In database engineering, concurrency control is critical. In this level, you must implement a lock mechanism to prevent race conditions when appending records.

## Objectives

Create a bash script at `/home/operator/append_locked.sh` that takes three arguments: `username`, `email`, and `role`. The script must safely append the new user using an auto-incrementing ID while protecting the operation using a lockfile or lock directory at `/tmp/database.lock`.

## Requirements

1. The script usage must be: `/home/operator/append_locked.sh <username> <email> <role>`.
2. Before reading `/home/operator/users.csv` or appending to it, the script must attempt to acquire a lock at `/tmp/database.lock`.
3. If the lock is already held (i.e. `/tmp/database.lock` exists), the script must wait (e.g. using a loop with `sleep` calls) until the lock is released.
4. Once the lock is acquired, the script must:
   - Create the lock `/tmp/database.lock` (so others are blocked).
   - Read the last ID, increment it, and write the new record.
   - Simulate work in the critical section by sleeping for exactly 1 second (`sleep 1`).
   - Release the lock (delete `/tmp/database.lock`).
5. Ensure the script is executable: `chmod +x /home/operator/append_locked.sh`.

> [!TIP]
> Using `mkdir /tmp/database.lock` is an atomic operation in Linux and a standard way to implement lock creation in shell scripting, but creating a regular file or using `flock` is also acceptable as long as it behaves correctly under concurrent conditions.

Good luck!
