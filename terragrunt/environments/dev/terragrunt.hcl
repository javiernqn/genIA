include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../..//modules"
}

inputs = {
  environment = "dev"
  
  users_table_name = "smartwallet-users-dev"
  geolocation_table_name = "smartwallet-geolocation-dev"
  
  login_function_name = "smartwallet-login-dev"
  register_function_name = "smartwallet-register-dev"
  
  jwt_secret = "smartwallet_secret_key_dev_2024"
  
  tags = {
    Environment = "dev"
    Project     = "smartwallet"
  }
}