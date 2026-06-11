#!/bin/bash
if [ ! -f /home/operator/archive_db.sh ]; then
  echo "Error: /home/operator/archive_db.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/archive_db.sh ]; then
  echo "Error: /home/operator/archive_db.sh is not executable."
  exit 1
fi

# Run archive_db.sh as operator
su - operator -c "/home/operator/archive_db.sh"
if [ $? -ne 0 ]; then
  echo "Error: Failed to execute /home/operator/archive_db.sh"
  exit 1
fi

# Verify archive exists
if [ ! -f /home/operator/archive/backup.tar.gz ]; then
  echo "Error: /home/operator/archive/backup.tar.gz does not exist."
  exit 1
fi

# Get list of files in tarball
tar_list=$(tar -tf /home/operator/archive/backup.tar.gz)

# Check if target files were archived
if ! echo "$tar_list" | grep -q "system_old.log"; then
  echo "Error: system_old.log was not archived."
  exit 1
fi

if ! echo "$tar_list" | grep -q "system_large.log"; then
  echo "Error: system_large.log was not archived."
  exit 1
fi

# Check that other files were NOT archived
if echo "$tar_list" | grep -q "system_active.log"; then
  echo "Error: system_active.log should not have been archived."
  exit 1
fi

if echo "$tar_list" | grep -q "users.csv"; then
  echo "Error: users.csv should not have been archived."
  exit 1
fi

# Check file system status
if [ -f /home/operator/db/system_old.log ]; then
  echo "Error: /home/operator/db/system_old.log was not deleted from the db folder."
  exit 1
fi

if [ -f /home/operator/db/system_large.log ]; then
  echo "Error: /home/operator/db/system_large.log was not deleted from the db folder."
  exit 1
fi

if [ ! -f /home/operator/db/system_active.log ]; then
  echo "Error: /home/operator/db/system_active.log was mistakenly deleted."
  exit 1
fi

if [ ! -f /home/operator/db/users.csv ]; then
  echo "Error: /home/operator/db/users.csv was mistakenly deleted."
  exit 1
fi

echo "Validation successful!"
exit 0
