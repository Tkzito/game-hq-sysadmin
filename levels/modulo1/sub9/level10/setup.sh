#!/bin/bash
mkdir -p /home/operator/db
mkdir -p /home/operator/archive

# system_old.log (mtime older than 30 days - e.g. April 1st 2026)
echo "old log content" > /home/operator/db/system_old.log
touch -t 202604010000 /home/operator/db/system_old.log

# system_large.log (mtime recent, size 15KB)
dd if=/dev/zero of=/home/operator/db/system_large.log bs=1024 count=15 2>/dev/null
touch -t 202606090000 /home/operator/db/system_large.log

# system_active.log (mtime recent, size 1KB)
dd if=/dev/zero of=/home/operator/db/system_active.log bs=1024 count=1 2>/dev/null
touch -t 202606100000 /home/operator/db/system_active.log

# users.csv (mtime older than 30 days, but CSV not LOG)
echo "users csv" > /home/operator/db/users.csv
touch -t 202604010000 /home/operator/db/users.csv

chown -R operator:operator /home/operator
chmod -R 755 /home/operator/db /home/operator/archive
