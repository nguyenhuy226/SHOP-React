import AddressCard, { WithAddressLoading } from "@/components/AddressCard";
import { AddressDrawer } from "@/components/AddressDrawer";
import { Button } from "@/components/Button";
import { CartItem } from "@/components/CartItem";
import Field from "@/components/Field";
import { Radio } from "@/components/Radio";
import { PATH } from "@/config";
import { useCart } from "@/hooks/useCart";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { cartService } from "@/services/cart";
import { userService } from "@/services/user";
import { cartActions } from "@/stories/cart";
import { currency, regexp, required } from "@/utils";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const addressRules = {
  fullName: [required()],
  email: [required(), regexp("email")],
  phone: [required(), regexp("phone")],
  province: [required()],
  district: [required()],
  address: [required()],
};
export default function Checkout() {
  const paymentMethodRef = useRef("money");
  const noteRef = useRef("");
  const { preCheckoutResponse, preCheckoutLoading, preCheckoutData } =
    useCart();
  const [openAddressDrawer, setOpenAddressDrawer] = useState(false);
  const [address, setAddress] = useState();
  const dispatch = useDispatch();

  const addressForm = useForm(addressRules);

  const { loading: addressLoading } = useQuery({
    queryFn: () => userService.getAddress("?default=true"),
    onSuccess: (res) => {
      if (res?.data?.[0]) {
        setAddress(res?.data?.[0]);
      }
    },
  });

  const { loading: shippingLoading, data: shippingMethods } = useQuery({
    queryFn: () => cartService.getShippingMethod(),
  });
  const { reFetch: checkoutService, loading } = useQuery({
    enable: false,
    queryFn: ({ params }) => cartService.checkout(...params),
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!preCheckoutResponse?.listItems) {
      navigate(PATH.ViewCart);
    }
  }, []);

  const { listItems } = preCheckoutResponse;
  // const address = addressDefault?.data?.[0];

  const onPlaceOrder = async () => {
    let _address = address;
    if (!_address) {
      if (addressForm.validate()) {
        _address = addressForm.values;
      } else {
        return;
      }
    }
    const order = await checkoutService({
      shipping: {
        shippingMethod: preCheckoutResponse.shipping.shippingMethod,
        ..._address,
      },
      listItems: preCheckoutData.listItems,
      promotionCode: preCheckoutData.promotionCode,
      payment: {
        paymentMethod: paymentMethodRef.current,
      },
      note: noteRef.current,
    });
    dispatch(cartActions.clearCart());
    if (!address) {
      userService.addAddress(_address);
    }
    navigate(PATH.OrderComplete, { state: order.data });
  };

  const { promotion } = preCheckoutResponse;
  return (
    <>
      <AddressDrawer
        open={openAddressDrawer}
        onClose={() => setOpenAddressDrawer(false)}
        selected={address}
        onSelect={setAddress}
      />
      <div>
        <section className="pt-7 pb-12">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                {/* Heading */}
                <h3 className="mb-4">Checkout</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-7">
                <div className="max-w-[300px] mb-5">
                  <Link
                    to={PATH.ViewCart}
                    className="btn btn-outline-dark btn-xs w-full"
                  >
                    Quay trở lại giỏ hàng
                  </Link>
                </div>
                {/* Heading */}
                <h6 className="mb-7">Shipping Details</h6>
                {/* Billing details */}
                {addressLoading ? (
                  <div className="row">
                    <WithAddressLoading loading />
                  </div>
                ) : address ? (
                  <div className="row">
                    <AddressCard
                      action={
                        <button
                          className="btn btn-xs btn-outline-dark absolute top-5 right-5"
                          onClick={() => setOpenAddressDrawer(true)}
                        >
                          Thay đổi địa chỉ khác
                        </button>
                      }
                      hideAction
                      className="bg-white border"
                      {...address}
                    />
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <Field
                        label="Full Name *"
                        placeholder="Full Name *"
                        {...addressForm.register("fullName")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <Field
                        label="Phone Number*"
                        placeholder="Phone Number*"
                        {...addressForm.register("phone")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <Field
                        label="Email Address *"
                        placeholder="Email Address *"
                        {...addressForm.register("email")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <Field
                        label="District *"
                        placeholder="District *"
                        {...addressForm.register("district")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <Field
                        label="Province / City *"
                        placeholder="Province / City *"
                        {...addressForm.register("province")}
                      />
                    </div>
                    <div className="col-12">
                      <Field
                        label="Address *"
                        placeholder="Address *"
                        {...addressForm.register("address")}
                      />
                    </div>
                  </div>
                )}
                <h6 className="mb-7">Shipping Method</h6>
                {/* Shipping details */}
                <div className="table-responsive mb-6">
                  <Radio.Group
                    onChange={(val) =>
                      dispatch(cartActions.changeShippingMethod(val))
                    }
                    defaultValue={preCheckoutResponse?.shipping?.shippingMethod}
                  >
                    <table className="table table-bordered table-sm table-hover mb-0">
                      <tbody>
                        {shippingMethods?.data?.map((e, i) => (
                          <tr key={i}>
                            <td className="whitespace-nowrap">
                              <Radio value={e.code}>{e.title}</Radio>
                            </td>
                            <td>{e.description}</td>
                            <td>{currency(e.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Radio.Group>
                </div>
                {/* Heading */}
                <h6 className="mb-7">Payment</h6>
                {/* List group */}
                <Radio.Group
                  defaultValue="money"
                  onChange={(val) => (paymentMethodRef.current = val)}
                >
                  <div className="list-group list-group-sm mb-7">
                    <div className="list-group-item">
                      {/* Radio */}
                      <Radio value="card">
                        Credit Card{" "}
                        <img
                          className="ml-2"
                          src="/img/brands/color/cards.svg"
                          alt="..."
                        />
                      </Radio>
                    </div>
                    {/* <div
                    className="list-group-item collapse py-0"
                    id="checkoutPaymentCardCollapse"
                  >
                   
                    <div className="form-row py-5">
                      <div className="col-12">
                        <div className="form-group mb-4">
                          <label
                            className="sr-only"
                            htmlFor="checkoutPaymentCardNumber"
                          >
                            Card Number
                          </label>
                          <input
                            className="form-control form-control-sm"
                            id="checkoutPaymentCardNumber"
                            type="text"
                            placeholder="Card Number *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mb-4">
                          <label
                            className="sr-only"
                            htmlFor="checkoutPaymentCardName"
                          >
                            Name on Card
                          </label>
                          <input
                            className="form-control form-control-sm"
                            id="checkoutPaymentCardName"
                            type="text"
                            placeholder="Name on Card *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="form-group mb-md-0">
                          <label
                            className="sr-only"
                            htmlFor="checkoutPaymentMonth"
                          >
                            Month
                          </label>
                          <select
                            className="custom-select custom-select-sm"
                            id="checkoutPaymentMonth"
                          >
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="form-group mb-md-0">
                          <label
                            className="sr-only"
                            htmlFor="checkoutPaymentCardYear"
                          >
                            Year
                          </label>
                          <select
                            className="custom-select custom-select-sm"
                            id="checkoutPaymentCardYear"
                          >
                            <option>2017</option>
                            <option>2018</option>
                            <option>2019</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="input-group input-group-merge">
                          <input
                            className="form-control form-control-sm"
                            id="checkoutPaymentCardCVV"
                            type="text"
                            placeholder="CVV *"
                            required
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              data-toggle="popover"
                              data-placement="top"
                              data-trigger="hover"
                              data-content="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards."
                            >
                              <i className="fe fe-help-circle" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                    <div className="list-group-item">
                      {/* Radio */}
                      <Radio value="money">Trả tiền khi nhận hàng</Radio>
                    </div>
                  </div>
                </Radio.Group>
                {/* Notes */}
                <textarea
                  onChange={(ev) => (noteRef.current = ev.target.value)}
                  className="form-control form-control-sm mb-9 mb-md-0 font-size-xs"
                  rows={5}
                  placeholder="Order Notes (optional)"
                  defaultValue={""}
                />
              </div>
              <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                {/* Heading */}
                <h6 className="mb-7">Order Items (3)</h6>
                {/* Divider */}
                <hr className="mt-7 mb-0" />
                {/* List group */}
                <div className="product-card">
                  <div className="card-body">
                    <ul className="list-group list-group-lg list-group-flush">
                      {listItems?.map((e) => (
                        <CartItem
                          hideAction
                          key={e.productId}
                          className="px-0"
                          {...e}
                          footer={
                            <>
                              x {e.quantity} = {currency(e.price)}
                            </>
                          }
                        />
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="product-card card mb-9 bg-light">
                  <div className="card-body">
                    <Spin spinning={preCheckoutLoading}>
                      <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                        <li className="list-group-item d-flex">
                          <span>Subtotal</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(preCheckoutResponse?.subTotal)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex">
                          <span>Promotion</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {promotion?.discount > 0 ? "-" : ""}
                            {currency(promotion?.discount)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex">
                          <span>Shipping</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(
                              preCheckoutResponse?.shipping?.shippingPrice
                            )}
                          </span>
                        </li>
                        <li className="list-group-item d-flex">
                          <span>Tax</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(preCheckoutResponse?.tax)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex font-size-lg font-weight-bold">
                          <span>Total</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(preCheckoutResponse?.total)}
                          </span>
                        </li>
                      </ul>
                    </Spin>
                  </div>
                </div>
                {/* Disclaimer */}
                <p className="mb-7 font-size-xs text-gray-500">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
                {/* Button */}
                <Button
                  loading={loading}
                  className="w-full"
                  onClick={onPlaceOrder}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* FEATURES */}
        <section className="bg-light py-9">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex mb-6 mb-lg-0">
                  {/* Icon */}
                  <i className="fe fe-truck font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="heading-xxs mb-1">Free shipping</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      From all orders over $100
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex mb-6 mb-lg-0">
                  {/* Icon */}
                  <i className="fe fe-repeat font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="mb-1 heading-xxs">Free returns</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      Return money within 30 days
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex mb-6 mb-md-0">
                  {/* Icon */}
                  <i className="fe fe-lock font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="mb-1 heading-xxs">Secure shopping</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      You're in safe hands
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex">
                  {/* Icon */}
                  <i className="fe fe-tag font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="mb-1 heading-xxs">Over 10,000 Styles</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      We have everything you need
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
