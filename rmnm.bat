@echo off

echo "Remove node modules"
rmdir /q /s node_modules
del package-lock.json
npm install
pause