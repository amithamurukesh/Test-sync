/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getConfig } from '../../../config/config';
import {
  IMPORT_BATCH_SIZE,
  PRODUCT_IMPORT_TYPE,
} from '../../../constants/import';
import { log } from '../../../utils/logger';

const createImportRequest = async (
  token: string,
  backupData: any,
  importContainerKey: string
): Promise<void> => {
  const importBatchSize = IMPORT_BATCH_SIZE;
  const importApiURL = `${getConfig().commercetoolDestinationURL}/${
    getConfig().commerceToolDestinationProjectKey
  }`;

  const sentRequest = async (data: any): Promise<any> => {
    const response = await axios.post(
      `${importApiURL}/product-drafts/import-containers/${importContainerKey}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const status = await response.status;

    return status;
  };

  try {
    for (
      let product = 0;
      product < backupData.length;
      product += importBatchSize
    ) {
      const batch = backupData.slice(product, product + importBatchSize);

      const importObject = {
        type: PRODUCT_IMPORT_TYPE,
        resources: batch,
      };

      await sentRequest(importObject);
    }
  } catch (error) {
    log.error(`Import request service error!: ${error.message}`);
  }
};

export { createImportRequest };
