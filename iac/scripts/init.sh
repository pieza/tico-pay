#! /bin/bash
set -x

sudo apt update
sudo apt upgrade -y

# dependencies
sudo apt install nginx -y
sudo apt install whois -y

sudo add-apt-repository ppa:certbot/certbot -y
sudo apt-get update
sudo apt-get install python-certbot-nginx -y


curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs -y
sudo apt install npm -y

yes n | sudo npm install -g @angular/cli@9.0.3
npm install -g pm2
npm install -g yarn

# firewall
yes | sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

rm /etc/nginx/sites-available/default

cat <<EOT >> /etc/nginx/sites-available/default
server {
    listen 80;
    listen [::]:80;

    server_name ${domain} www.${domain};
    error_page 404 =200 /index.html;

    location / {
        proxy_pass http://localhost:${app_port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;

        if (\$scheme != "https") {
            return 301 https://\$host\$request_uri;
        }
    }
}
EOT

sudo nginx -t
sudo service nginx restart

sudo certbot --nginx -n --agree-tos --email=${email}  -d ${domain} -d www.${domain}