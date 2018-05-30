# Update All Config Scripts
#
# Cory Welch
# corywelch.ca
# https://github.com/corywelch

# https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/updatescripts.sh

curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/makehosts.sh > /home/pi/config/makehosts.sh
curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/setupdnsmasq.sh > /home/pi/config/setupdnsmasq.sh
curl https://raw.githubusercontent.com/corywelch/WelchServer/master/DNSDHCPServer/Master/updatedsnmasq.sh > /home/pi/config/updatednsmasq.sh
