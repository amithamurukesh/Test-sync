/* eslint-disable max-statements */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CUSTOM_TYPE_ID, TAX_CATEGORY, CHANNEL } from '../constants/transform';
import { getProductTypeKey } from './get-product-type-key';

const replaceCustomTypeId = (price): void => {
  if (price?.custom?.type?.id) {
    price.custom.type.key = CUSTOM_TYPE_ID;

    delete price?.custom?.type?.id;
  }
};

const replaceTaxCategoryId = (product): void => {
  if (product?.taxCategory) {
    product.taxCategory.key = TAX_CATEGORY;

    delete product.taxCategory.id;
  }
};

const replaceAlamyLicenseId = (price): void => {
  if (price?.custom?.fields?.alamy_licenseId) {
    const updatedField = {
      type: 'String',
      value: price?.custom?.fields?.alamy_licenseId,
    };

    price.custom.fields.alamy_licenseId = updatedField;
  }
};

const replaceChannelId = (price): void => {
  if (price?.channel?.id) {
    delete price.channel.id;

    price.channel.key = CHANNEL;
  }
};

const replaceProductIdForPacks = (
  attributes,
  productIdMap,
  destinationProductKeyMap
): void => {
  attributes.forEach((attr) => {
    if (attr.name === 'applicableLicenses') {
      attr.value.forEach((val) => {
        val.id = destinationProductKeyMap[productIdMap[val.id]];
      });
    }
  });
};

const checkIfMetaTitleIsEmpty = (metaTitle): boolean => {
  const isEmptyValue = Object.values(metaTitle).every((item) => item === '');

  return isEmptyValue;
};

const checkIfDescriptionIsEmpty = (description): void => {
  for (const field in description) {
    if (description[field] === '') {
      delete description[field];
    }
  }
};

const transformProduct = (
  product: any,
  productTypesArray: any,
  productIdMap: any,
  destinationProductKeyMap = null
): any => {
  product.productType.key = getProductTypeKey(
    product.productType.id,
    productTypesArray
  );

  delete product.id;

  delete product.productType.id;

  delete product.masterVariant.id;

  delete product.categoryOrderHints;

  if (product?.metaDescription) {
    delete product.metaDescription;
  }
  if (product?.metaTitle) {
    if (checkIfMetaTitleIsEmpty(product.metaTitle)) {
      delete product.metaTitle;
    }
  }

  if (product?.description) {
    checkIfDescriptionIsEmpty(product.description);
  }

  // auto publishing
  product.publish = true;

  replaceTaxCategoryId(product);

  product?.variants?.forEach((item) => {
    delete item.id;

    if (destinationProductKeyMap) {
      replaceProductIdForPacks(
        item.attributes,
        productIdMap,
        destinationProductKeyMap
      );
    }

    item?.prices?.forEach((price) => {
      replaceAlamyLicenseId(price);

      replaceChannelId(price);
      replaceCustomTypeId(price);

      delete price.id;
    });
  });

  if (destinationProductKeyMap) {
    replaceProductIdForPacks(
      product.masterVariant.attributes,
      productIdMap,
      destinationProductKeyMap
    );
  }

  product?.masterVariant?.prices?.forEach((price) => {
    replaceChannelId(price);

    replaceCustomTypeId(price);

    replaceAlamyLicenseId(price);

    delete price.id;
  });

  return Promise.resolve(product);
};

export { transformProduct };
