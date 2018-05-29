# Update All Config Scripts
#
# Cory Welch
# corywelch.ca
# https://github.com/corywelch

curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/lanhosts > /home/pi/config/lanhosts
curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/amhosts > /home/pi/config/amhosts
curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/dsnmasq.conf > /home/pi/config/dnsmasq.conf
