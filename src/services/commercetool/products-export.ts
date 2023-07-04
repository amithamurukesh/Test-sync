/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { log } from '../../utils/logger';

const exportProducts = async (token: string, projectKey): Promise<any> => {
  const url = `https://api.commercetools.com/${projectKey}/products?limit=100`;

  // eslint-disable-next-line init-declarations
  let response;

  try {
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    log.error(`Products export error: ${error.message}`);
  }

  return response.data.results;
};

export { exportProducts };
