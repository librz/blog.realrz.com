#!/bin/bash

# cd the dir where this script is stored
cd "$(dirname "${BASH_SOURCE[0]}")" || exit

function err {
	echo "$1" >&2
}

echo "----"
echo "checking new commits in remote repo"
if fetchResult=$(git fetch origin); then
	if [[ -z "$fetchResult" ]]; then
		echo "already the latest code, no need to update"
		exit 0
	else 
		echo "merging with origin/main"
		git merge origin/main
	fi
else
	err "faile to run git fetch, check your network connectivity"
	exit 1
fi

# check whether there's a process running on port 9001
# if there is, kill it
if result=$(
	bash <(curl -sL https://raw.githubusercontent.com/librz/shell-scripts/main/3p.sh) --port 9001
); then
    # get pid & kill it
    pid=$(echo "$result" | awk 'NR>1{print $2}')
		echo "found process with pid $pid already running on port 9001"
		echo "killing it..."
    if kill "$pid"; then
			echo "killed process with pid $pid"
		else
			err "failed to kill process with pid $pid"
			exit 2
		fi
fi

# build it
echo "----"
echo "building..."
npm run build

# serve it
echo "----"
echo "serving..."
npm run serve

