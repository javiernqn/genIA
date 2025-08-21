resource "aws_dynamodb_table" "merchants" {
  name           = var.merchants_table_name
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "category"
    type = "S"
  }

  attribute {
    name = "province"
    type = "S"
  }

  global_secondary_index {
    name     = "CategoryIndex"
    hash_key = "category"
  }

  global_secondary_index {
    name     = "ProvinceIndex"
    hash_key = "province"
  }

  tags = var.tags
}