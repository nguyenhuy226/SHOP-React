import { ENV } from "@/config";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer, getUserAction } from "./auth";
import { cartReducer, cartSaga, getCartAction } from "./cart";

const sagaMiddldeware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  devTools: ENV === "development",
  middleware: (getMiddleware) => getMiddleware().concat(sagaMiddldeware),
});

sagaMiddldeware.run(cartSaga);

store.dispatch(getUserAction());
store.dispatch(getCartAction());
