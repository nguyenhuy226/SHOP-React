import {
  storeCart,
  storePreCheckoutData,
  storePreCheckoutResponse,
} from "@/utils";
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
  updatePreCheckoutData,
} from "./saga";

export const {
  reducer: cartReducer,
  actions: cartActions,
  name,
  getInitialState,
} = createSlice({
  name: "cart",
  initialState: () => {
    return {
      cart: storeCart.get(),
      openCartOver: false,
      loading: {},
      preCheckoutData: storePreCheckoutData.get() || {
        promotionCode: [],
        listItems: [],
        shippingMethod: "mien-phi",
      },
      preCheckoutLoading: false,
      preCheckoutResponse: storePreCheckoutResponse.get() || {},
      promotionLoading: false,
    };
  },
  reducers: {
    clearCart(state) {
      return {
        ...state,
        openCartOver: false,
        loading: {},
        preCheckoutData: {
          promotionCode: [],
          listItems: [],
          shippingMethod: "mien-phi",
        },
        preCheckoutLoading: false,
        preCheckoutResponse: {},
        promotionLoading: false,
      };
    },
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
    changeShippingMethod(state, action) {
      state.preCheckoutData.shippingMethod = action.payload;
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
  yield takeLatest(
    [getCartAction, loginSuccessAction, cartActions.clearCart],
    fetchCart
  );
  yield takeLatest([logoutAction, cartActions.clearCart], clearCart);
  yield takeLatest(cartActions.setCart, setCartSaga);
  yield takeLatest(toggleCheckoutItemAction, selectCartItem);
  yield takeLatest(
    [
      cartActions.setPreCheckoutData,
      updateItemQuantitySuccessAction,
      cartActions.togglePromotionCode,
      cartActions.changeShippingMethod,
    ],
    fetchPreCheckout
  );

  // promotion
  yield takeLatest(addPromotionAction, fetchAddPromotion);
  yield takeLatest(removePromotionAction, removePromotion);

  yield takeLatest(removeCartItemAction, updatePreCheckoutData);
}
