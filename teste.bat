@echo off
start chrome http://localhost:5173/
call server_opener.bat
cd client
call npm i
call npm run dev
cd ..
