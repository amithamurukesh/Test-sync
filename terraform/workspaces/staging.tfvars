# AWS Common
profile        = "alamystaging"
region         = "eu-west-1"
s3_bucket      = "serverless-deployments-alamy-eu-west-1-staging"
lambda_version = "v1.1.3"
ct_auth_url = "https://auth.europe-west1.gcp.commercetools.com/"
ct_api_host = "https://api.europe-west1.gcp.commercetools.com/"

ct_source_project_key = "alamy-staging"
aws_source_secret_name = "commercetool/staging"
ct_destination_url = "https://import.europe-west1.gcp.commercetools.com"
ct_destination_project_key = "meraki-development"
aws_destination_secret_name = "commercetool/dr"
commercetool_backup_bucket = "commercetools-backup-staging"
environment = "staging"