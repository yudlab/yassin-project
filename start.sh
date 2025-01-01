#!/bin/bash

# Run npm start in the background and log output
echo "Running npm start..."
nohup npm start &

# Run npm run dev in the foreground
echo "Running npm run dev..."
npm run dev
