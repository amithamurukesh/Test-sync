import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { getConfig } from '../../../config/config';

const secretsManagerClient = new SecretsManagerClient({
  region: getConfig().awsRegion || 'eu-west-1',
});

export { secretsManagerClient };
