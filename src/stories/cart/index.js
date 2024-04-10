import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import { loginSuccessAction, logoutAction } from "../auth";
import {
  clearCart,
  fetchAddPromotion,
  fetchCart,
  fetchCartItem,
  fetchPreCheckout,
  fetchRemoveItem,
  removePromotion,
  selectCartItem,
  setCartSaga,
} from "./saga";
import { getCart } from "@/utils";

export const {
  reducer: cartReducer,
  actions: cartActions,
  name,
  getInitialState,
} = createSlice({
  name: "cart",
  initialState: () => {
    return {
      cart: getCart(),
      openCartOver: false,
      loading: {},
      preCheckoutData: {
        promotionCode: [],
        listItems: [],
      },
      preCheckoutLoading: false,
      preCheckoutResponse: {},
      promotionLoading: false,
    };
  },
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    togglePopover(state, action) {
      state.openCartOver = action.payload;
    },
    toggleProductLoading(state, action) {
      state.loading[action.payload.productId] = action.payload.loading;
    },
    setPreCheckoutData(state, action) {
      state.preCheckoutData = action.payload;
    },
    setPreCheckoutResponse(state, action) {
      state.preCheckoutResponse = action.payload;
    },
    togglePreCheckoutLoading(state, action) {
      state.preCheckoutLoading = action.payload;
    },
    togglePromotionCode(state, action) {
      if (action.payload) {
        state.preCheckoutData.promotionCode = [action.payload];
      } else {
        state.preCheckoutData.promotionCode = [];
      }
    },
    tooglePromotionLoading(state, action) {
      state.promotionLoading = action.payload;
    },
  },
});
export const updateCartItemAction = createAction(`${name}/addCartItem`);
export const removeCartItemAction = createAction(`${name}/removeCartItem`);
export const getCartAction = createAction(`${name}/getCart`);
export const toggleCheckoutItemAction = createAction(`${name}/selectCartItem`);
export const updateItemQuantitySuccessAction = createAction(
  `${name}/updateItemQuantitySuccess`
);
export const addPromotionAction = createAction(`${name}/addPromotion`);
export const removePromotionAction = createAction(`${name}/removePromotion`);

export function* cartSaga() {
  yield takeLatest(updateCartItemAction, fetchCartItem);
  yield takeLatest(removeCartItemAction, fetchRemoveItem);
  yield takeLatest([getCartAction, loginSuccessAction], fetchCart);
  yield takeLatest(logoutAction, clearCart);
  yield takeLatest(cartActions.setCart, setCartSaga);
  yield takeLatest(toggleCheckoutItemAction, selectCartItem);
  yield takeLatest(
    [
      cartActions.setPreCheckoutData,
      updateItemQuantitySuccessAction,
      cartActions.togglePromotionCode,
    ],
    fetchPreCheckout
  );

  // promotion
  yield takeLatest(addPromotionAction, fetchAddPromotion);
  yield takeLatest(removePromotionAction, removePromotion);
}
