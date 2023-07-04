/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-statements */
import { PassThrough } from 'stream';
import { getConfig } from './config/config';
import { createProductTypes } from './services/commercetool/create-product-types';
import { exportProductTypes } from './services/commercetool/product-types-export';
import { exportProducts } from './services/commercetool/products-export';
import { importProducts } from './services/commercetool/products-import';
import { packsImport } from './services/packs-import';
import { getAuthToken } from './services/token';
import { log } from './utils/logger';
import { parseSecret } from './utils/secret-parser';
import { transformResponse } from './utils/transform-response';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = async (): Promise<{ message: string } | void> => {
  if (getConfig().env === 'staging') {
    return ;
  }

  try {
    const destinationProjectKey = getConfig().commerceToolDestinationProjectKey;
    const sourceProjectkey = getConfig().commerceToolSourceProjectKey;
console.log('Source',sourceProjectkey);
console.log('destination',destinationProjectKey);
    const commerceToolDestinationSecret = await parseSecret(
      getConfig().commerceToolDestinationSecretName
    );

    const commerceToolSourceSecret = await parseSecret(
      getConfig().commerceToolSourceSecretName
    );

    const destinationToken = await getAuthToken(
      commerceToolDestinationSecret.clientId,
      commerceToolDestinationSecret.secretName
    );

    const sourceToken = await getAuthToken(
      commerceToolSourceSecret.clientId,
      commerceToolSourceSecret.secretName
    );

    const destinationProductTypes = await exportProductTypes(
      destinationToken,
      destinationProjectKey
    );

    const sourceProductTypes = await exportProductTypes(
      sourceToken,
      sourceProjectkey
    );

    // For initial backup product types in destination project doesn't exist
    // so, need to push product types from source to destination before products import
    if (sourceProductTypes.length !== destinationProductTypes.length) {
      for (let item = 0; item < sourceProductTypes.length; item++) {
        // eslint-disable-next-line no-await-in-loop
        await createProductTypes(
          destinationToken,
          destinationProjectKey,
          sourceProductTypes[item]
        );
      }
    }

    // source products
    const products = await exportProducts(sourceToken, sourceProjectkey);

    const regex = /^product-pack/g;

    // split packs and standard licenses products
    const [packsProducts, standardLicenseProducts] = products.reduce(
      (result, element) => {
        result[element.key.match(regex) ? 0 : 1].push(element);

        return result;
      },
      [[], []]
    );

    const standardBackupData = await transformResponse(
      standardLicenseProducts,
      sourceProductTypes
    );

    // publish products of type standard license
    const standardLicense = await importProducts(
      destinationToken,
      standardBackupData
    );

    log.info(
      `standard license products import summary:
      ${JSON.stringify(standardLicense.data.states)}`
    );

    // const destinationProducts = await exportProducts(
    //   destinationToken,
    //   destinationProjectKey
    // );

    // const isInitialBackup = destinationProducts.length === 0;

    // For initial backup destination products does not exist
    // So, need to wait till products with standard licenses will be fully imported
    // if (isInitialBackup) {
    //   const numberOfRetries = 30;
    //   const apiCallTimeOut = 10000;

    //   const timeout = (ms: number): Promise<void> =>
    //     new Promise((resolve) => setTimeout(resolve, ms));

    //   for (let iterator = 0; iterator < numberOfRetries; iterator++) {
       // eslint-disable-next-line no-await-in-loop
      //   const productsFromDestination = await exportProducts(
      //     destinationToken,
      //     destinationProjectKey
      //   );

      //   if (productsFromDestination.length === standardLicenseProducts.length) {
      //     const packsBackupData = await packsImport(
      //       products,
      //       packsProducts,
      //       sourceProductTypes,
      //       destinationToken,
      //       productsFromDestination
      //     );

      //     const awsData = [...standardBackupData, ...packsBackupData];

      //     // // Import to S3
      //     // const stream = new PassThrough();

      //     // stream.write(JSON.stringify(awsData, null, 2));

      //     // await uploadToS3(stream);

      //     // break;
      //   }
      //    // eslint-disable-next-line no-await-in-loop
      //    await timeout(apiCallTimeOut);
      // }
    // } else {
    //   const packsBackupData = await packsImport(
    //     products,
    //     packsProducts,
    //     sourceProductTypes,
    //     destinationToken,
    //     destinationProducts
    //   );

    //   const awsData = [...standardBackupData, ...packsBackupData];

      // // Import to S3
      // const stream = new PassThrough();

      // stream.write(JSON.stringify(awsData, null, 2));

      // await uploadToS3(stream);
     //}
  } catch (error) {
    log.error(`Main handler error: ${error.message}`);
  }

  // eslint-disable-next-line consistent-return
  return Promise.resolve({ message: 'CT BACKUP FINISHED' });
};

export { handler };
