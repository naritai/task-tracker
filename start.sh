#!/bin/bash

# убить все процессы если есть http-server и json-server
killall -9 json-server;
killall -9 http-server;
killall -9 live-server;


# после этого можем запускать сервера заново
# npx http-server ./frontend/ -P http://127.0.0.1:8080 & 
npx live-server --port=8080 --entry-file=./frontend/index.html &
npx json-server ./backend/database.json  & 