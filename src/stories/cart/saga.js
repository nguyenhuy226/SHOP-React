import { cartService } from "@/services/cart";
import {
  getToken,
  handleError,
  setCart,
  storePreCheckoutData,
  storePreCheckoutResponse,
} from "@/utils";
import { call, delay, put, race, select, take } from "redux-saga/effects";
import {
  cartActions,
  getCartAction,
  removeCartItemAction,
  updateCartItemAction,
  updateItemQuantitySuccessAction,
} from ".";
import { authActions } from "../auth";

export function* fetchCartItem(action) {
  try {
    yield delay(300);
    if (action.payload.quantity >= 1) {
      // muốn gọi api, thực thi 1 promise trong generator function thì phải dùng call
      yield call(
        cartService.addItem,
        action.payload.productId,
        action.payload.quantity
      );
      // thunkApi.dispatch(getCartAction());

      yield put(getCartAction()); // put trong saga cũng giống như dispatch giống khi dùng thunkapi.dispatch
      if (action.payload.showPopover) {
        yield put(cartActions.togglePopover(true));
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
      yield put(updateItemQuantitySuccessAction(action.payload.productId));
    } else {
      yield put(removeCartItemAction(action.payload.productId));
    }
  } catch (error) {
    console.log(error);
    // throw error.response.data;
  }
}

export function* fetchRemoveItem(action) {
  try {
    yield put(
      cartActions.toggleProductLoading({
        productId: action.payload,
        loading: true,
      })
    );
    yield call(cartService.removeItem, action.payload);
    yield put(getCartAction());
    yield put(
      cartActions.toggleProductLoading({
        productId: action.payload,
        loading: false,
      })
    );
    yield put(updateItemQuantitySuccessAction(action.payload));
  } catch (error) {
    console.log(error);
  }
  // console.log("cart/getCart/pending");
}

export function* fetchCart() {
  if (getToken()) {
    // const cart = yield call(cartService.getCart);
    const { cart, logout } = yield race({
      cart: call(cartService.getCart),
      logout: take(authActions.logout),
    });
    if (cart) {
      yield put(cartActions.setCart(cart.data));
    }
  }
}

export function* clearCart() {
  yield put(cartActions.setCart(null));
  yield put(cartActions.clearCart());
  //   getInitialState()
}
export function* setCartSaga(action) {
  setCart(action.payload);
}

export function* selectCartItem(action) {
  try {
    let {
      cart: { preCheckoutData },
    } = yield select();
    let { listItems } = preCheckoutData;
    listItems = [...listItems];
    // const {precheckoutData} = cart

    const { checked, productId } = action.payload;
    if (checked) {
      listItems.push(productId);
    } else {
      listItems = listItems.filter((e) => e !== productId);
    }

    yield put(
      cartActions.setPreCheckoutData({
        ...preCheckoutData,
        listItems,
      })
    );
  } catch (error) {
    handleError(error);
  }
}

export function* fetchPreCheckout(action) {
  try {
    let {
      cart: { preCheckoutData },
    } = yield select();
    if (action.type === updateItemQuantitySuccessAction.toString()) {
      let productId = action.payload;
      if (!preCheckoutData.listItems.find((e) => e === productId)) return;
    }
    yield put(cartActions.togglePreCheckoutLoading(true));

    const res = yield call(cartService.preCheckout, preCheckoutData);
    yield put(cartActions.setPreCheckoutResponse(res.data));

    yield put(cartActions.togglePreCheckoutLoading(false));
    storePreCheckoutData.set(preCheckoutData);
    storePreCheckoutResponse.set(res.data);
  } catch (error) {
    handleError(error);
  }
}

export function* fetchAddPromotion(action) {
  try {
    yield put(cartActions.tooglePromotionLoading(true));
    yield call(cartService.getPromotion, action.payload.data);
    yield put(cartActions.togglePromotionCode(action.payload.data));
    action.payload?.onSuccess?.();
  } catch (error) {
    action.payload?.onError?.(error);
    // handleError(error);
  } finally {
    yield put(cartActions.tooglePromotionLoading(false));
  }
}

export function* removePromotion(action) {
  yield put(cartActions.togglePromotionCode());
  action?.payload?.onSuccess?.();
}
