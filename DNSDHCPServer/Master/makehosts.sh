#!/bin/bash

# Make and Place Host File

# Cory Welch
# corywelch.ca
# https://github.com/corywelch

curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/lanhosts > /home/pi/config/lanhosts
curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/amhosts > /home/pi/config/amhosts

cat /home/pi/config/lanhosts /home/pi/config/amhosts > /etc/hosts

/etc/rc.d/init.d/nscd restart