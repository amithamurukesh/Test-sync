variable "region" {
  type    = string
  default = "eu-west-1"
}
variable "profile" {
  type    = string
  default = "alamydev"
}

variable "s3_bucket" {
  type = string
}

variable "s3_folder" {
  type    = string
  default = ""
}

variable "lambda_version" {
  type = string
}

variable "lambda_timeout" {
  type    = number
  default = 330
}

variable "lambda_concurrency" {
  type    = number
  default = 1
}

variable "log_level" {
  type    = string
  default = "info"
}

variable "log_retention_days" {
  type    = number
  default = 30
}

variable "node_options" {
  type    = string
  default = "--enable-source-maps"
}

variable "ct_auth_url" {
  type    = string
  default     = "https://auth.europe-west1.gcp.commercetools.com/"
  description = "CommerceTools authhorization url"
}

variable "ct_api_host" {
  type   = string
  default     = null
  description = "CommerceTools api url"
}

variable "ct_source_project_key" {
  type   = string
  default     = null
  description = "CommerceTools project key"
}

variable "aws_source_secret_name" {
  type   = string
  default = null
}

variable "ct_destination_url" {
  type   = string
  default = null
  description = "CommerceTools import api url"
}

variable "ct_destination_project_key" {
  type   = string
  default = null
  description = "CommerceTools project key"
}

variable "aws_destination_secret_name" {
  type   = string
  default = null
  description = "Secret to CommerceTools project" 
}

variable "commercetool_backup_bucket" {
  type   = string
  default = null
  description = "S3 bucket for backup"
}

variable "environment" {
  type   = string
  default = null
}


