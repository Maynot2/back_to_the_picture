#!/bin/env bash

git pull
npm run build
sudo rm -rf /var/www/backtothepicture/static/
sudo mv build/* /var/www/backtothepicture/
pm2 restart bttp
set -o allexport; source /home/ubuntu/back_to_the_picture/back/api/.env; set +o allexport
