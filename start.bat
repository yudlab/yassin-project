@echo off

REM Run npm start in the background and log output
echo Running npm start...
start /B npm start > npm-start.log 2>&1

REM Run npm run dev in the foreground
echo Running npm run dev...
npm run dev
