import { Config, Env } from '../types/config';

const getConfig = (): Config => {
  // eslint-disable-next-line no-process-env
  const env = process.env as Partial<Env>;

  return {
    env: env.ENVIRONMENT,
    logLevel: env.LOG_LEVEL,
    commerceToolAuthURL: env.COMMERCE_TOOL_AUTH_URL,
    commerceToolApiHost: env.COMMERCE_TOOL_API_HOST,
    commerceToolSourceProjectKey: env.CT_SOURCE_PROJECT_KEY,
    commerceToolSourceClientId: env.CT_SOURCE_CLIENT_ID,
    commerceToolSourceSecretName: env.CT_SOURCE_SECRET_NAME,
    awsRegion: env.AWS_REGION,
    commerceToolDestinationProjectKey: env.CT_DESTINATION_PROJECT_KEY,
    commerceToolDestinationClientId: env.CT_DESTINATION_ID,
    commerceToolDestinationSecretName: env.CT_DESTINATION_SECRET_NAME,
    commercetoolDestinationURL: env.CT_DESTINATION_URL,
   } as Config;
};

export { getConfig };
