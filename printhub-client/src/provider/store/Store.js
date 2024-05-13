import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/auth/AuthSlice";
import CatalogSlice from "../features/catalog/CatalogSlice";
import ProductSlice from "../features/product/ProductSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice, 
    catalog: CatalogSlice, 
    product: ProductSlice, 
  },
});
