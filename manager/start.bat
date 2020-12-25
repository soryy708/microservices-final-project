@ECHO OFF
start cmd /c py ../simple/add/app.py
start cmd /c node ../simple/div/index.js
start cmd /c node ../simple/mod/index.js
start cmd /c node ../simple/mul/index.js
start cmd /c node ../simple/pow/index.js
start cmd /c py ../simple/sub/app.py
py ./client.py
