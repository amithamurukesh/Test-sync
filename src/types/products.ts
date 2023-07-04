import type { Product } from '@commercetools/platform-sdk';

interface ProductsExportData {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Array<Product>;
}

export type { ProductsExportData };
