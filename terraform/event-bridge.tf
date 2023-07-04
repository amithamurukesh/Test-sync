resource "random_string" "id" {
  length = 10
  special = false
}

resource "aws_cloudwatch_event_rule" "commercetools-backup-handler-lambda_event_rule" {
  name                = "commercetools-backup-handler-lambda-event-rule-${random_string.id.result}"
  description         = "Scheduled every day at 00:00"
  schedule_expression = "cron(0 0 * * ? *)"
}

resource "aws_cloudwatch_event_target" "commercetools-backup-handler-lambda_target" {
  arn  = module.lambda_function.lambda_function_arn
  rule = aws_cloudwatch_event_rule.commercetools-backup-handler-lambda_event_rule.name
}

resource "aws_lambda_permission" "allow_event_bridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_function.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.commercetools-backup-handler-lambda_event_rule.arn
}