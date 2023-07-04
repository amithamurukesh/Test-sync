output "nestjs-lambda-template_arn" {
  value = module.lambda_function.lambda_function_arn
}

output "nestjs-lambda-template_logs" {
  value = module.lambda_function.lambda_cloudwatch_log_group_arn
}
