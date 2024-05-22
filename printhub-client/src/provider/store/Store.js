import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/auth/AuthSlice";
import CatalogSlice from "../features/catalog/CatalogSlice";
import ProductSlice from "../features/product/ProductSlice";
import CartSlice from "../features/cart/CartSlice";

import ArticleSlice from "../features/article/ArticleSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice, 
    catalog: CatalogSlice, 
    product: ProductSlice, 
    cart: CartSlice, 
    article: ArticleSlice,

  },
});
