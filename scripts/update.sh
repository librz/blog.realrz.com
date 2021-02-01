#!/bin/bash

function err {
	echo "$1" >&2
}

# check whether there's a process running on port 9001
# if there is, kill it

if result=$(
	bash <(curl -sL https://raw.githubusercontent.com/librz/shell_scripts/main/3p.sh) --port 9001
); then
    # get pid & kill it
    pid=$(echo "$result" | awk 'NR>1{print $2}')
		echo "found process with pid $pid already running on port 9001"
		echo "killing it..."
    if kill "$pid"; then
			echo "killed process with pid $pid"
		else
			err "failed to kill process with pid $pid"
			exit 1
		fi
fi

# get the latest code
echo "----"
echo "pulling the latest change from github..."
git pull

# build it
echo "----"
echo "building..."
npm run build

# serve it
echo "----"
echo "serving..."
npm run serve


    
