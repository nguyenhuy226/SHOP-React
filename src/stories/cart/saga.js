import { cartService } from "@/services/cart";
import { getToken, setCart } from "@/utils";
import { call, delay, put, race, take } from "redux-saga/effects";
import {
  cartActions,
  getCartAction,
  getInitialState,
  removeCartItemAction,
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
  //   getInitialState()
}
export function* setCartSaga(action) {
  setCart(action.payload);
}
