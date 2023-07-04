/* eslint-disable @typescript-eslint/no-explicit-any */
import { transformProduct } from './transform-product';

const transformResponse = (
  productsArr: Array<any>,
  productTypesArray: any,
  productIdMap = null,
  destinationProductKeyMap = null
): Promise<any> => {
  const resourcesData = Promise.all(
    productsArr.map((product) => {
      const productImportData = {
        id: product.id,
        productType: product.productType,
        key: product.key,
        taxCategory: product.taxCategory,
        priceMode: product.priceMode,
        ...product.masterData.current,
      };

      // eslint-disable-next-line no-return-await
      return transformProduct(
        productImportData,
        productTypesArray,
        productIdMap,
        destinationProductKeyMap
      );
    })
  );

  return resourcesData;
};

export { transformResponse };
