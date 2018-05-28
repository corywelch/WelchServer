#!/bin/bash
set -e

# Setup / Install dnsmasq
# based stuff by Stephen Wood

# Cory Welch
# corywelch.ca
# https://github.com/corywelch

# Must be run as root
if [[ `whoami` != "root" ]]
then
  echo "This install must be run as root or with sudo."
  exit
fi

apt-get install -y dnsmasq

/home/pi/config/updatednsmasq.sh
