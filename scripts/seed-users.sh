#!/bin/bash

# Configure AWS credentials before running this script:
# export AWS_DEFAULT_REGION="us-west-2"
# export AWS_ACCESS_KEY_ID="your_access_key"
# export AWS_SECRET_ACCESS_KEY="your_secret_key"
# export AWS_SESSION_TOKEN="your_session_token"

TABLE_NAME="smartwallet-users-dev"

users=(
  "maria_23:2:23"
  "carlos_28:3:28"
  "ana_32:4:32"
  "pedro_37:5:37"
  "lucia_42:6:42"
  "miguel_48:7:48"
  "sofia_55:8:55"
  "roberto_61:9:61"
  "elena_67:10:67"
)

for user in "${users[@]}"; do
  IFS=':' read -r username id age <<< "$user"
  
  aws dynamodb put-item \
    --table-name $TABLE_NAME \
    --item "{\"username\":{\"S\":\"$username\"},\"id\":{\"S\":\"$id\"},\"age\":{\"N\":\"$age\"},\"createdAt\":{\"S\":\"2025-01-21T15:36:00Z\"}}"
  
  echo "Usuario creado: $username ($age años)"
done