variable "users_table_name" {
  description = "Name of the users table"
  type        = string
}

variable "geolocation_table_name" {
  description = "Name of the geolocation table"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}