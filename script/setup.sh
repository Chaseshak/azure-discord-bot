#!/bin/bash

# 1. Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Please install Node.js and re-run this script."
  exit 1
fi

# 2. Install dependencies from package.json
echo "Installing dependencies from package.json..."
npm install

echo "Dev env setup complete! Run the server with script/server.sh!"
