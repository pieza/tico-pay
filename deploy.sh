#! /bin/bash
set -x

cd /home/tico-pay/frontend
yes n | npm install
ng build --prod

cd /home/tico-pay/api
yarn install
pm2 stop tico-pay || echo "no process found..."
pm2 start src/index.js --name tico-pay