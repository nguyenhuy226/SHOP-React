import { ENV } from "@/config";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer, authSaga, getUserAction } from "./auth";
import { cartReducer, cartSaga, getCartAction } from "./cart";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([cartSaga(), authSaga()]);
}
const sagaMiddldeware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  devTools: ENV === "development",
  middleware: (getMiddleware) =>
    getMiddleware({ serializableCheck: false }).concat(sagaMiddldeware),
  // serializableCheck: false là tắt chế kể redcux tookit kiểm tra đầu vào của 1 action có phải là một ofobject không và trong object có chưa 1 function không
});

sagaMiddldeware.run(rootSaga);

store.dispatch(getUserAction());
store.dispatch(getCartAction());
