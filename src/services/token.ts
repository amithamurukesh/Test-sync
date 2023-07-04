import axios from 'axios';
import { getConfig } from '../config/config';
import { log } from '../utils/logger';

const authUrl = `${
  getConfig().commerceToolAuthURL
}oauth/token?grant_type=client_credentials`;

const getAuthToken = async (
  username: string,
  password: string
): Promise<string> => {
  // eslint-disable-next-line init-declarations
  let authToken;

  try {
    authToken = (
      await axios.post(
        authUrl,
        {},
        {
          auth: {
            username,
            password,
          },
        }
      )
    ).data;
  } catch (error) {
    log.error(`Auth service error: ${error.message}`);
  }

  return authToken.access_token;
};

export { getAuthToken };
