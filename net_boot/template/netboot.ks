%pre --interpreter=/bin/bash --erroronfail
#!/bin/bash

exec < /dev/tty3 > /dev/tty3
chvt 3
(

interval=1
count=0
max_hit=5
URL="http://192.168.190.16:8000/unattended/provision"

while [ $count -lt $max_hit ]
do
    echo "Running for $((count*interval)) seconds."

    response=$(curl -s -o /dev/null -H "X-RHN-Provisioning-MAC-0: eth0 00:aa:aa:10:10:bb" -w "%{http_code}" "$URL")

    if [ "$response" -eq 200 ]; then
        echo "Success: Received 200 OK from $URL"
        curl -s -o /root/netboot.ks -H "X-RHN-Provisioning-MAC-0: eth0 00:aa:aa:10:10:bb" "$URL"
        break
    else
        echo "Attempt $((count+1)): $response $URL. Retrying in $interval s"
    fi

    count=$((count+1))
    sleep $interval
done

if [ $count -eq $max_hit ]; then
    echo "Error: Maximum attempts reached. Exiting with error."
    exit 1
fi

chvt 1
) 2>&1 | tee /tmp/anaconda.log

%end

%include /root/netboot.ks
