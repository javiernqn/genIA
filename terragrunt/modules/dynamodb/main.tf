resource "aws_dynamodb_table" "users" {
  name           = var.users_table_name
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "username"

  attribute {
    name = "username"
    type = "S"
  }

  tags = var.tags
}

resource "aws_dynamodb_table" "geolocation" {
  name           = var.geolocation_table_name
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = var.tags
}