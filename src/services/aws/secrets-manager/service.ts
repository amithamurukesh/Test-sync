import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { log } from '../../../utils/logger';
import { secretsManagerClient } from './client';

class SecretsManagerService {
  private readonly secretsManagerClient: SecretsManagerClient;

  public constructor() {
    this.secretsManagerClient = secretsManagerClient;
  }

  public async getSecretValueById(id: string): Promise<string> {
    const getSecretCommand = new GetSecretValueCommand({ SecretId: id });

    try {
      const data = await this.secretsManagerClient.send(getSecretCommand);
      let value = '';

      if ('SecretString' in data) {
        value = data.SecretString;
      } else {
        const buff = Buffer.from(data.SecretBinary);

        value = buff.toString('ascii');
      }

      return value;
    } catch (error) {
      log.error(`Secret manager service error: ${error.message}`);

      throw error;
    }
  }
}

const secretsManagerService = new SecretsManagerService();

export default secretsManagerService;
