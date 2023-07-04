/* eslint-disable @typescript-eslint/no-explicit-any */

import secretsManagerService from '../services/aws/secrets-manager/service';
import { log } from './logger';

const parseSecret = async (
  secretName: string
): Promise<{
  clientId: string;
  secretName: string;
}> => {
  const secretsObject = {
    clientId: '',
    secretName: '',
  };
  const secret = await secretsManagerService.getSecretValueById(secretName);

  try {
    const secretJSON = JSON.parse(secret);

    secretsObject.clientId = secretJSON.client_id;
    secretsObject.secretName = secretJSON.secret;
  } catch (error) {
    log.error(`Secret parser error: ${error}`);

    return null;
  }

  return secretsObject;
};

export { parseSecret };
