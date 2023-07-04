data "aws_s3_bucket" "commercetool_backup_bucket" {
  bucket = var.commercetool_backup_bucket
}

data "aws_secretsmanager_secret" "source_secret" {
  name = var.aws_source_secret_name
}

data "aws_secretsmanager_secret" "destination_secret" {
  name = var.aws_destination_secret_name
}

data "aws_kms_key" "source_secret_encryption_key" {
  key_id = data.aws_secretsmanager_secret.source_secret.kms_key_id
}

data "aws_kms_key" "destination_secret_encryption_key" {
  key_id = data.aws_secretsmanager_secret.destination_secret.kms_key_id
}