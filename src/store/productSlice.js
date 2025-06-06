import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const fetchAllProducts = createAsyncThunk("products/fetchAllProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        product.isFavourite = true;
      }
    },
    removeFavourite: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        product.isFavourite = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  }
});

export const { addFavourite, removeFavourite } = productsSlice.actions;

export default productsSlice.reducer;