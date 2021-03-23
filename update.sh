#!/bin/bash

function err {
	echo "$1" >&2
}

# cd the dir where this script is stored
if ! cd "$(dirname "${BASH_SOURCE[0]}")"; then
	echo "cd failed"
	exit 9
fi

echo "----"
echo "checking to see if local repo is up to date"
if ! git fetch origin; then
	err "fail to run git fetch, check your network connectivity"
	exit 1
fi

if [[ -z $(git diff origin/main) ]]; then
	echo "you already have the latest code"	
	echo "this may happen when you used 'git pull' or 'git merge' mannually"
	echo "or simply there's nothing new on the remote repo"
	read -r -p "still want to build & deploy anyway? (Y/N) " answer
	if [[ "$answer" =~ [nN][oO]* ]]; then
	   exit
	fi	   
else
	echo "merging with origin/main"
	if ! git merge origin/main; then
		err "merge failed"
		exit 2
	fi
fi

echo

# check whether there's a process running on port 9001
# if there is, kill it

if result=$(bash <(curl -sL http://realrz.com/shell-scripts/3p.sh) --port 9001); then
    # get pid & kill it
    pid=$(echo "$result" | awk 'NR>1{print $2}')
	echo "found process with pid $pid already running on port 9001"
	echo "killing it..."
    if kill "$pid"; then
		echo "killed process with pid $pid"
	else
		err "failed to kill process with pid $pid"
		exit 3
	fi
fi

# build it
echo "----"
echo "building..."
if ! npm run build; then
	err "build failed"
	exit 5
fi

# serve it
echo "----"
echo "serving..."
if ! npm run serve; then
	err "serve failed"
	exit 6
fi

