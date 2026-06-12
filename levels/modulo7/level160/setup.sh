#!/bin/bash
set -euo pipefail

mkdir -p /home/operator
# Clear state
echo '{"containers": [], "images": []}' > /home/operator/.docker_state.json

# Create mock application files for the backend
mkdir -p /home/operator/backend
cat << 'EOF' > /home/operator/backend/index.js
const express = require('express');
const redis = require('redis');
const app = express();
const port = 80;

const client = redis.createClient({
  url: 'redis://redis:6379'
});

app.get('/', async (req, res) => {
  res.send('Integrated E-Commerce Platform - Online');
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
EOF

cat << 'EOF' > /home/operator/backend/package.json
{
  "name": "hodrich-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1",
    "redis": "^4.0.0"
  }
}
EOF

chown -R operator:operator /home/operator
