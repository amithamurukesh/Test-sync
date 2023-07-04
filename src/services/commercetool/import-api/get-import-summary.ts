// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import { getConfig } from '../../../config/config';
import { log } from '../../../utils/logger';

const getImportSummary = async (
  token: string,
  importContainerKey
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const importApiURL = `${getConfig().commercetoolDestinationURL}/${
    getConfig().commerceToolDestinationProjectKey
  }`;

  // eslint-disable-next-line init-declarations
  let importSummary;

  try {
    importSummary = await axios.get(
      `${importApiURL}/import-containers/${importContainerKey}/import-summaries`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    log.error(`Import summary service error: ${error.message}`);
  }

  return importSummary;
};

export { getImportSummary };
