#!/bin/bash
#! PRODUCTION

# git reset --hard
# git checkout master
# git  pull origin master

npm i yarn -g
yarn global add serve
yarn
yarn run build
pm2 serve dist 1004 --spa --name RESIDO-CLIENT


#! DEVELOPMENT
# git reset --hard
# git checkout develop
# git pull origin develop

# npm i
# pm2 start process.config.js --env development