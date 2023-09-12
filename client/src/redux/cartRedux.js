import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethod";

export const addCartProduct = createAsyncThunk(
  "addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/cart/add`, data);
      return response.data.products;
    } catch (error) {
      console.error(error);
      throw error;
    }
    // Extract and return only the response data
  }
);

export const getCartProducts = createAsyncThunk("getProducts", async () => {
  try {
    const response = await userRequest.get("/cart");
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const deleteCartItem = createAsyncThunk(
  "deleteCartItem",
  async (data) => {
    console.log(data);
    try {
      const response = await userRequest.delete("/cart/delete/" + data.cartId);

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const deleteCart = createAsyncThunk("deleteCart", async () => {
  try {
    const res = await userRequest.delete("/cart/");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
export const updateCartItem = createAsyncThunk(
  "updateCartItem",
  async (data) => {
    try {
      const response = await userRequest.put(
        "/cart/update/" + data.cartId,
        data
      );

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    removeCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: {
    [addCartProduct.pending]: (state) => {
      state.loading = true;
    },
    [addCartProduct.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action?.payload?.price * action?.payload?.quantity;
  
    },
    [addCartProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getCartProducts.pending]: (state) => {
      state.loading = true;
    },
    [getCartProducts.fulfilled]: (state, action) => {
      state.loading = false;

      state.quantity = action.payload.products.length;
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
    },
    [getCartProducts.rejected]: (state, action) => {
      state.loading = false;
      state.quantity = 0;
      state.products = [];
      state.totalPrice = 0;
      state.error = action.payload;
    },
    [deleteCartItem.pending]: (state) => {
      state.loading = true;
    },
    [deleteCartItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.quantity -= 1;
      state.products = state.products.filter(
        (ele) => ele.cartId !== action.payload.cartId
      );
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },
    [deleteCartItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteCart.pending]: (state) => {
      state.loading = true;
    },
    [deleteCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.quantity = 0;
      state.products = [];
      state.totalPrice = 0;
    },
    [deleteCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateCartItem.pending]: (state) => {
      state.loading = true;
    },
    [updateCartItem.fulfilled]: (state, action) => {
      state.loading = false;

      state.products = state.products.map((ele) => {
        if (ele.cartId === action.payload.cartId) {
          const updatedProduct = ele;
          console.log(updatedProduct);
          if (updatedProduct.quantity === action.payload.quantity) {
            // Do nothing
          } else if (updatedProduct.quantity > action.payload.quantity) {
            state.totalPrice -=
              updatedProduct.price *
              (updatedProduct.quantity - action.payload.quantity);
          } else {
            state.totalPrice +=
              updatedProduct.price *
              (action.payload.quantity - updatedProduct.quantity);
          }
          updatedProduct.quantity = action.payload.quantity;

          updatedProduct.selectedSize = action.payload.selectedSize;
          return updatedProduct;
        } else {
          return ele;
        }
      });
    },
    [updateCartItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addProduct, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
