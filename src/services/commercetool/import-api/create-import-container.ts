/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import { getConfig } from '../../../config/config';
import { log } from '../../../utils/logger';

const createImportContainer = async (token: string): Promise<AxiosResponse> => {
  const importApiURL = `${getConfig().commercetoolDestinationURL}/${
    getConfig().commerceToolDestinationProjectKey
  }`;

  // eslint-disable-next-line init-declarations
  let importContainer;

  try {
    importContainer = await axios.post(
      `${importApiURL}/import-containers`,
      {
        key: `dr-import-container-${Date.now()}`,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    log.error(`Import container service error: ${error.message}`);
  }

  return importContainer;
};

export { createImportContainer };
