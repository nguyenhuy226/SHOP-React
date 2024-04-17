import { PATH } from "@/config";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { generatePath, Link, useLocation, useNavigate } from "react-router-dom";

export default function OrderComplete() {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state?._id) navigate(PATH.Product);
  }, [state]);
  return (
    <section className="py-12">
      <Helmet>
        <title>Đặt hàng thành công</title>
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
            {/* Icon */}
            <div className="mb-7 font-size-h1">❤️</div>
            {/* Heading */}
            <h2 className="mb-5">Your Order is Completed!</h2>
            {/* Text */}
            <p className="mb-7 text-gray-500">
              Your order{" "}
              <span className="text-body text-decoration-underline">
                {state?._id}
              </span>{" "}
              has been completed. Your order details are shown for your personal
              accont.
            </p>
            {/* Button */}
            <Link
              className="btn btn-dark"
              to={generatePath(PATH.Profile.OrderDetail, { id: state?._id })}
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
