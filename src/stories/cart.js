import { cartService } from "@/services/cart";
import { getToken } from "@/utils";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

export const updateCartItemAction = createAction("cart/addCartItem");

// export const updateCartItemAction = createAsyncThunk(
//   "cart/addCartItem",
//   async (data, thunkApi) => {
//     try {
//       await cartService.addItem(data.productId, data.quantity);
//       thunkApi.dispatch(getCartAction());
//       if (data.showPopover) {
//         thunkApi.dispatch(cartActions.togglePopover(true));

//         window.scroll({
//           top: 0,
//           behavior: "smooth",
//         });
//       }
//     } catch (error) {
//       throw error.response.data;
//     }
//   }
// );

export const getCartAction = createAsyncThunk(
  "cart/getCart",
  async (_, thunkApi) => {
    try {
      if (getToken()) {
        const cart = await cartService.getCart();
        thunkApi.dispatch(cartActions.setCart(cart.data));
        // return cart;
      }
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    openCartOver: false,
  },
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    togglePopover(state, action) {
      state.openCartOver = action.payload;
    },
  },
});

function* fetchCartItem(action) {
  try {
    // muốn gọi api trong generator function thì phải dùng call
    yield call(
      cartService.addItem,
      action.payload.productId,
      action.payload.quantity
    );
    // thunkApi.dispatch(getCartAction());

    yield put(getCartAction()); // put trong saga cũng giống như dispatch
    if (action.payload.showPopover) {
      yield put(cartActions.togglePopover(true));

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  } catch (error) {
    console.log(error);
    // throw error.response.data;
  }
}

function* getCart() {
  // console.log("cart/getCart/pending");
}

export function* cartSaga() {
  yield takeLatest("cart/getCart/pending", getCart);
  yield takeLatest(updateCartItemAction, fetchCartItem);
}
