import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { getConfig } from '../../config/config';
import { log } from '../../utils/logger';

const region = getConfig().awsRegion;

const secretClient = new SecretsManagerClient({ region });

const getSecretValue = async (secretId: string): Promise<string> => {
  let secret = '';

  try {
    const data = await secretClient.send(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      new GetSecretValueCommand({ SecretId: secretId })
    );

    if ('SecretString' in data) {
      secret = data.SecretString;
    } else {
      const buff = Buffer.from(data.SecretBinary.toString(), 'base64');

      secret = buff.toString('ascii');
    }
  } catch (error) {
    log.error(error);
  }

  return secret;
};

export { getSecretValue };
