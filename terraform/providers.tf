terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.44.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.4.0"
    }
  }
  backend "s3" {
    encrypt = true
  }
}

provider "aws" {
  profile = var.profile
  region  = var.region
  default_tags {
  tags = {
    Service         = "commercetools-backup-handler"
    Squad_name      = "sunlight"
    Repository_name = "commercetools-backup-handler-lambda"
    Created_by      = "terraform"
    Environment     = title(terraform.workspace)
    }
  }
}
