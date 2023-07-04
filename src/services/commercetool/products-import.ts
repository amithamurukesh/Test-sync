/* eslint-disable max-statements */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */

import { log } from '../../utils/logger';
import { createImportContainer } from './import-api/create-import-container';
import { createImportRequest } from './import-api/create-import-request';
import { getImportSummary } from './import-api/get-import-summary';

const importProducts = async (token: string, backupData: any): Promise<any> => {
  // eslint-disable-next-line init-declarations
  let summary;

  try {
    const container = await createImportContainer(token);

    log.info(`import container id: ${container.data.key}`);

    try {
      await createImportRequest(token, backupData, container.data.key);

      try {
        summary = await getImportSummary(token, container.data.key);
      } catch (error) {
        log.error(error.message);
      }
    } catch (error) {
      log.error(error.message);
    }
  } catch (error) {
    log.error(`Products import error: ${error.message}`);
  }

  return summary;
};

export { importProducts };
