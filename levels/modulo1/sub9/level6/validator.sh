#!/bin/bash
if [ ! -f /home/operator/append_locked.sh ]; then
  echo "Error: /home/operator/append_locked.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/append_locked.sh ]; then
  echo "Error: /home/operator/append_locked.sh is not executable."
  exit 1
fi

# Clean lock just in case
rm -rf /tmp/database.lock

# Start instance 1
su - operator -c "/home/operator/append_locked.sh u1 u1@mail.com user" &
PID1=$!

# Wait briefly for lock to be created
sleep 0.3

# Check if lock exists (either as directory or file)
if [ ! -e /tmp/database.lock ] && [ ! -d /tmp/database.lock ]; then
  echo "Error: Lockfile /tmp/database.lock was not created during execution."
  kill $PID1 2>/dev/null
  exit 1
fi

# Start instance 2 (should block)
su - operator -c "/home/operator/append_locked.sh u2 u2@mail.com user" &
PID2=$!

# Wait for both
wait $PID1
wait $PID2

# Check lock is released
if [ -e /tmp/database.lock ] || [ -d /tmp/database.lock ]; then
  echo "Error: Lockfile was not cleaned up after execution."
  exit 1
fi

# Check CSV content (we expect IDs 3 and 4 in some order, but let's check exact formats)
# Since they are concurrent, u1 or u2 might get ID 3. Let's verify both exist and have IDs 3 and 4.
grep -q ",u1,u1@mail.com,user" /home/operator/users.csv
U1_OK=$?
grep -q ",u2,u2@mail.com,user" /home/operator/users.csv
U2_OK=$?

if [ $U1_OK -ne 0 ] || [ $U2_OK -ne 0 ]; then
  echo "Error: The added users were not found in /home/operator/users.csv."
  cat /home/operator/users.csv
  exit 1
fi

# Check for correct IDs 3 and 4
ID3=$(grep -E '^[3],' /home/operator/users.csv)
ID4=$(grep -E '^[4],' /home/operator/users.csv)

if [ -z "$ID3" ] || [ -z "$ID4" ]; then
  echo "Error: Missing IDs 3 and 4. Race condition might have occurred or ID logic failed."
  cat /home/operator/users.csv
  exit 1
fi

echo "Validation successful!"
exit 0
