#! /bin/bash
set -x

cd /home/tico-pay/frontend
yes n | npm install
ng build --prod

cd /home/tico-pay/api
yarn install
pm2 stop tico-pay
pm2 start scr/index.js --name tico-pay