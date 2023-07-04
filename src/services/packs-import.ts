/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from '../utils/logger';
import { transformResponse } from '../utils/transform-response';
import { importProducts } from './commercetool/products-import';

const packsImport = async (
  sourceProducts: any,
  packsProducts: any,
  sourceProductTypes: string,
  destinationToken: any,
  destProducts: any
): Promise<any> => {
  const destinationProductKeyMap = {};

  for (const product of destProducts) {
    destinationProductKeyMap[product.key] = product.id;
  }

  const productIdMap = {};

  for (const product of sourceProducts) {
    productIdMap[product.id] = product.key;
  }

  const packsBackupData = await transformResponse(
    packsProducts,
    sourceProductTypes,
    productIdMap,
    destinationProductKeyMap
  );

  const importPacks = await importProducts(destinationToken, packsBackupData);

  log.info(`packs import summary: ${JSON.stringify(importPacks.data.states)}`);

  return packsBackupData;
};

export { packsImport };
