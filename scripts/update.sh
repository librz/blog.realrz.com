#!/bin/bash

# check whether there's a process running on port 9001
# if there is, kill it

result=$(bash <(curl -sL https://raw.githubusercontent.com/librz/shell_scripts/main/3p.sh) --port 9001)

if [[ "$?" -eq 0 ]]; then
    # get pid & kill it
    pid=$(echo $result | awk '{print $2}' | cut -d':' -f2)
    kill "$pid"
fi

# get the latest code
git pull

# build it
npm run build

# serve it
npm run serve


    