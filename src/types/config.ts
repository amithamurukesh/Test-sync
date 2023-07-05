interface Env {
  ENVIRONMENT: string;
  LOG_LEVEL: string;
  COMMERCE_TOOL_AUTH_URL: string;
  COMMERCE_TOOL_API_HOST: string;
  CT_SOURCE_PROJECT_KEY: string;
  CT_SOURCE_CLIENT_ID: string;
  CT_SOURCE_SECRET_NAME: string;
  AWS_REGION: string;
  CT_DESTINATION_ID: string;
  CT_DESTINATION_SECRET_NAME: string;
  CT_DESTINATION_PROJECT_KEY: string;
  CT_DESTINATION_URL: string;
  
}

interface Config {
  env: string;
  logLevel: string;
  commerceToolAuthURL: string;
  commerceToolApiHost: string;
  commerceToolSourceProjectKey: string;
  commerceToolSourceClientId: string;
  commerceToolSourceSecretName: string;
  awsRegion: string;
  commerceToolDestinationProjectKey: string;
  commerceToolDestinationClientId: string;
  commerceToolDestinationSecretName: string;
  commercetoolDestinationURL: string;
  
}

export type { Config, Env };
