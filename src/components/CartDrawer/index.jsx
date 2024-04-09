import { useCart } from "@/hooks/useCart";
import { Drawer } from "antd";
import { CartItem } from "../CartItem";
import { currency } from "@/utils";
import { Link } from "react-router-dom";
import { PATH } from "@/config";

export const CartDrawer = ({ open, onClose }) => {
  const { cart } = useCart();
  return (
    <Drawer
      open={open}
      onClose={onClose}
      headerStyle={{ display: "none" }}
      bodyStyle={{ padding: 0 }}
      width={470}
    >
      <>
        {cart?.listItems?.length ? (
          <div className="modal-content">
            {/* Close */}
            <button
              onClick={onClose}
              type="button"
              className="close !outline-none"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i className="fe fe-x" aria-hidden="true" />
            </button>
            {/* Header*/}
            <div className="modal-header line-height-fixed font-size-lg">
              <strong className="mx-auto">
                Your Cart ({cart?.totalQuantity})
              </strong>
            </div>
            {/* List group */}
            <ul className="list-group list-group-lg list-group-flush">
              {cart?.listItems?.map((e) => (
                <CartItem key={e.productId} {...e} />
              ))}
            </ul>
            {/* Footer */}
            <div className="modal-footer line-height-fixed font-size-sm bg-light mt-auto">
              <strong>Subtotal</strong>{" "}
              <strong className="ml-auto">{currency(cart?.subTotal)}</strong>
            </div>
            {/* Buttons */}
            <div className="modal-body">
              <Link
                className="btn btn-block btn-outline-dark"
                to={PATH.ViewCart}
                onClick={onClose}
              >
                View Cart
              </Link>
            </div>
          </div>
        ) : (
          <div className="modal-content">
            <button
              type="button"
              className="close !outline-none"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i className="fe fe-x" aria-hidden="true" />
            </button>

            <div className="modal-header line-height-fixed font-size-lg">
              <strong className="mx-auto">Your Cart (0)</strong>
            </div>

            <div className="modal-body flex-grow-0 my-auto">
              <h6 className="mb-7 text-center">Your cart is empty 😞</h6>

              <Link
                onClick={onClose}
                className="btn btn-block btn-outline-dark"
                to={PATH.Product}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </>
    </Drawer>
  );
};
