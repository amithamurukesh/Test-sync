/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
// import { getConfig } from '../../config/config';
import { log } from '../../utils/logger';

const exportProductTypes = async (
  token: string,
  projectKey: string
): Promise<any> => {
  const url = `https://api.commercetools.com/${projectKey}/product-types`;

  // eslint-disable-next-line init-declarations
  let response;

  try {
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    log.error(`Product types export error: ${error.message}`);
  }

  return response.data.results;
};

export { exportProductTypes };
