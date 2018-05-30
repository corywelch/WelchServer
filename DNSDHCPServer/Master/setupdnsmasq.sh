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

curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/dsnmasq.conf > /home/pi/config/dnsmasq.conf
cp /home/pi/config/dnsmasq.conf /etc/dnsmasq.conf

service dnsmasq restart
