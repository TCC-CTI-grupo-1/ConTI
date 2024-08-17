@echo off
cd client
call npm i
call npm run dev
cd ..
cd server
call npm i
call npm run dev
cd ..
start chrome http://localhost:5173/