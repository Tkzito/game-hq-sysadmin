#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create application stub files
cat << 'EOF' > /home/operator/app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hodrich Web App - Online');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
EOF

cat << 'EOF' > /home/operator/package.json
{
  "name": "hodrich-legacy-app",
  "version": "1.0.0",
  "description": "Legacy node app",
  "main": "app.js",
  "dependencies": {
    "express": "^4.17.1"
  }
}
EOF

chown -R operator:operator /home/operator
