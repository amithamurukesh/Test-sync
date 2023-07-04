/* eslint-disable @typescript-eslint/no-explicit-any */

const getProductTypeKey = (
  productTypeId: string,
  productTypesArray: any
): Promise<string> => {
  const types = productTypesArray;

  const productTypesMap = {};

  for (const productType of types) {
    productTypesMap[productType.id] = productType.key;
  }

  return productTypesMap[productTypeId];
};

export { getProductTypeKey };
