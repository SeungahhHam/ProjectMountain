#!/usr/bin/env bash

REPOSITORY=/home/ec2-user/app/git/ProjectMountain2

cd $REPOSITORY

npm install
npm run-script kill
#pm2 start test.js


npm run-script dev
