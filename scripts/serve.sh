#!/bin/bash

# check existence of netstat, nohup, node, awk

if ! which node; then
    apt install nodejs
fi

if ! which netstat; then
    apt install net-tools
fi

if ! which awk; then
    apt install awk
fi

# check whether there's a process running on port 9001

if netstat -tuln | awk '(NR>2){print $4}' | rev | cut -d':' -f1 | rev | uniq | grep 9001; then
    # get the pid 
fi