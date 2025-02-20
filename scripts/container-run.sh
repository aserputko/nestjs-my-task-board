#!/bin/bash

docker run 
    -e DATABASE_TYPE=postgres \              
    -e DATABASE_USER=postgres \
    -e DATABASE_PASSWORD=pass123 \
    -e DATABASE_NAME=testmigrations \
    -e DATABASE_PORT=5432 \
    -e DATABASE_HOST=10.89.3.11 \
    -p 4000:3000 \
    aserputko-my-task-board:latest
