variable "environment" {
  description = "Environment name"
  type        = string
}

variable "users_table_name" {
  description = "Name of the users table"
  type        = string
}

variable "geolocation_table_name" {
  description = "Name of the geolocation table"
  type        = string
}

variable "login_function_name" {
  description = "Name of the login Lambda function"
  type        = string
}

variable "register_function_name" {
  description = "Name of the register Lambda function"
  type        = string
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}