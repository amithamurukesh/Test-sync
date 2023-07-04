/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import { getConfig } from '../../config/config';
import { log } from '../../utils/logger';

const createProductTypes = async (
  token: string,
  projectkey: string,
  productType: any
): Promise<AxiosResponse> => {
  const apiURL = `${getConfig().commerceToolApiHost}`;

  // eslint-disable-next-line init-declarations
  let productTypeImport;

  try {
    productTypeImport = await axios.post(
      `${apiURL}${projectkey}/product-types`,
      productType,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    log.error(
      `Product types import service error: ${error?.response?.data?.message}`
    );
  }

  return productTypeImport;
};

export { createProductTypes };
