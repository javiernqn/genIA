module "dynamodb" {
  source = "./dynamodb"
  
  users_table_name       = var.users_table_name
  geolocation_table_name = var.geolocation_table_name
  tags                   = var.tags
}

module "login_lambda" {
  source = "./lambda"
  
  function_name = var.login_function_name
  handler       = "index.handler"
  zip_file      = "../../lambda/smartwallet-lambda-v2.zip"
  
  environment_variables = {
    USERS_TABLE       = module.dynamodb.users_table_name
    GEOLOCATION_TABLE = module.dynamodb.geolocation_table_name
    JWT_SECRET        = var.jwt_secret
  }
  
  dynamodb_table_arns = [
    module.dynamodb.users_table_arn,
    module.dynamodb.geolocation_table_arn
  ]
  
  tags = var.tags
}

module "register_lambda" {
  source = "./lambda"
  
  function_name = var.register_function_name
  handler       = "register.handler"
  zip_file      = "../../lambda/smartwallet-lambda-v2.zip"
  
  environment_variables = {
    USERS_TABLE = module.dynamodb.users_table_name
  }
  
  dynamodb_table_arns = [
    module.dynamodb.users_table_arn
  ]
  
  tags = var.tags
}