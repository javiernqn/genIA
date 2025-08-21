#!/bin/bash

# Test login API
echo "Testing SmartWallet Login API"
echo "============================="

# Test 1: Login with existing user
echo "Test 1: Login with existing user (juan_19)"
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"juan_19","latitude":-34.6037,"longitude":-58.3816}' \
  https://9vzfs98vfb.execute-api.us-west-2.amazonaws.com/prod/login

echo -e "\n\n"

# Test 2: Login with different age group user
echo "Test 2: Login with adult user (carlos_28)"
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"carlos_28","latitude":-34.6118,"longitude":-58.3960}' \
  https://9vzfs98vfb.execute-api.us-west-2.amazonaws.com/prod/login

echo -e "\n\n"

# Test 3: Login with senior user
echo "Test 3: Login with senior user (elena_67)"
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"elena_67","latitude":-34.6158,"longitude":-58.3731}' \
  https://9vzfs98vfb.execute-api.us-west-2.amazonaws.com/prod/login

echo -e "\n\n"

# Test 4: Login with non-existent user
echo "Test 4: Login with non-existent user"
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"usuario_inexistente","latitude":-34.6037,"longitude":-58.3816}' \
  https://9vzfs98vfb.execute-api.us-west-2.amazonaws.com/prod/login

echo -e "\n"