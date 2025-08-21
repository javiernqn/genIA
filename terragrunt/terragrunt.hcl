remote_state {
  backend = "s3"
  config = {
    bucket = "smartwallet-terraform-state"
    key    = "${path_relative_to_include()}/terraform.tfstate"
    region = "us-west-2"
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "us-west-2"
}
EOF
}