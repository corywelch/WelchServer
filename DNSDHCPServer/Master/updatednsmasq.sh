#!/bin/bash

# Custom Host Entries for DNS Server

# Cory Welch
# corywelch.ca
# https://github.com/corywelch

cp /etc/dnsmasq.conf /etc/dnsmasq.conf.bak
rm /etc/dnsmasq.conf

curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/dsnmasq.conf > /home/pi/config/dnsmasq.conf
cp /home/pi/config/dnsmasq.conf /etc/dnsmasq.conf

service dnsmasq restart