locals {
  name   = "commercetools-production-staging-sync-lambda-${terraform.workspace}"
  folder = var.s3_folder != "" ? var.s3_folder : terraform.workspace
}

module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"
  version = "4.9.0"

  publish = true

  function_name                     = local.name
  handler                           = "src/main.handler"
  runtime                           = "nodejs18.x"
  memory_size                       = 512
  timeout                           = var.lambda_timeout
  cloudwatch_logs_retention_in_days = var.log_retention_days
  description                       = "Nestjs terraform mangaged lambda template"
  tracing_mode                      = "PassThrough"
  reserved_concurrent_executions    = var.lambda_concurrency
  create_package                    = false
  s3_existing_package = {
    bucket = var.s3_bucket
    key    = "bundles/commercetools-production-staging-sync-lambda/${local.folder}/${var.lambda_version}.zip"
  }
  environment_variables = {
    LOG_LEVEL = var.log_level
    NODE_OPTIONS = var.node_options
    COMMERCE_TOOL_AUTH_URL =  var.ct_auth_url
    COMMERCE_TOOL_API_HOST = var.ct_api_host
    CT_SOURCE_PROJECT_KEY = var.ct_source_project_key
    CT_SOURCE_SECRET_NAME = var.aws_source_secret_name
    CT_DESTINATION_URL = var.ct_destination_url
    CT_DESTINATION_PROJECT_KEY = var.ct_destination_project_key
    CT_DESTINATION_SECRET_NAME = var.aws_destination_secret_name
    S3_BUCKET = var.commercetool_backup_bucket
    ENVIRONMENT = var.environment
  }
  tags = {
    Version     = var.lambda_version
  }

  attach_policy_statements = true
   policy_statements = {
    s3_put = {
      effect    = "Allow",
      actions   = ["s3:PutObject"],
      resources = ["${data.aws_s3_bucket.commercetool_backup_bucket.arn}/*"]
    }
    secrets_manager_read = {
      effect    = "Allow",
      actions   = ["secretsmanager:GetSecretValue"],
      resources = [data.aws_secretsmanager_secret.source_secret.arn, data.aws_secretsmanager_secret.destination_secret.arn]
    }

    kms_decrypt = {
      effect    = "Allow",
      actions   = ["kms:Decrypt", "kms:GenerateDataKey"],
      resources = [data.aws_kms_key.source_secret_encryption_key.arn, data.aws_kms_key.destination_secret_encryption_key.arn]
    }
  }
}