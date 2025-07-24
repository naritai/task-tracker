#!/bin/bash

# убить все процессы если есть http-server и json-server
killall -9 json-server;
killall -9 http-server;

# после этого можем запускать сервера заново
npx http-server ./frontend/ -p 3333 & 
npx json-server ./backend/database.json  & 