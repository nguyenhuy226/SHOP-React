import { Button } from "@/components/Button";
import { OrderStatus } from "@/components/OrderStatus";
import Skeleton from "@/components/Skeleton";
import { PATH } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { orderService } from "@/services/order";
import { currency } from "@/utils";
import { message } from "antd";
import moment from "moment";
import { generatePath, Link, useNavigate, useParams } from "react-router-dom";

const SHIPPING = {
  "giao-hang-nhanh": "Giao hàng nhanh",
  "mien-phi": "Miễn phí",
  "tieu-chuan": "Tiêu chuẩn",
};
const PAYMENT = {
  money: "Trả tiền khi nhận hàng",
  card: "Thanh toán bằng thẻ",
};
const Loading = () => {
  return (
    <div>
      <div className="card card-lg mb-5 border">
        <div className="card-body pb-0">
          {/* Info */}
          <Skeleton height={89.49} />
        </div>
        <div className="card-footer">
          {/* Heading */}
          <h6 className="mb-7">
            {" "}
            <Skeleton height={23.99} width="50%" />
          </h6>
          {/* Divider */}
          <hr className="my-5" />
          {/* List group */}
          <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
            <li className="list-group-item">
              <Skeleton height={73.04} />
            </li>
            <li className="list-group-item">
              <Skeleton height={73.04} />
            </li>
            <li className="list-group-item">
              <Skeleton height={73.04} />
            </li>
          </ul>
        </div>
      </div>
      {/* Total */}
      <div className="card card-lg mb-5 border">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">
            {" "}
            <Skeleton height={24} width="50%" />
          </h6>
          {/* List group */}
          <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
            <li className="list-group-item d-flex">
              <span>
                <Skeleton height={24} width={60} />
              </span>
              <span className="ml-auto">
                <Skeleton height={24} width={90} />
              </span>
            </li>
            <li className="list-group-item d-flex">
              <span>
                <Skeleton height={24} width={60} />
              </span>
              <span className="ml-auto">
                {" "}
                <Skeleton height={24} width={90} />
              </span>
            </li>
            <li className="list-group-item d-flex">
              <span>
                <Skeleton height={24} width={60} />
              </span>
              <span className="ml-auto">
                <Skeleton height={24} width={90} />
              </span>
            </li>
            <li className="list-group-item d-flex">
              <span>
                <Skeleton height={24} width={60} />
              </span>
              <span className="ml-auto">
                <Skeleton height={24} width={90} />
              </span>
            </li>
            <li className="list-group-item d-flex font-size-lg font-weight-bold">
              <span>
                <Skeleton height={24} width={60} />
              </span>
              <span className="ml-auto">
                <Skeleton height={24} width={90} />
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Details */}
      <div className="card card-lg border">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">
            {" "}
            <Skeleton height={24} width="50%  " />
          </h6>
          {/* Content */}
          <div className="row">
            <div className="col-12 col-md-4">
              {/* Heading */}
              <p className="mb-4 font-weight-bold">
                {" "}
                <Skeleton height={24} width={199.33} />
              </p>
              <p className="mb-7 mb-md-0 text-gray-500">
                <Skeleton height={199.33} width={192} />
              </p>
            </div>
            <div className="col-12 col-md-4">
              {/* Heading */}
              <p className="mb-4 font-weight-bold">
                <Skeleton height={24} width={199.33} />
              </p>
              <p className="mb-7 text-gray-500">
                <Skeleton height={48} width={199.33} />
              </p>
              {/* Heading */}
              <p className="mb-4 font-weight-bold">
                <Skeleton height={24} width={199.33} />
              </p>
              <p className="mb-0 text-gray-500">
                <Skeleton height={24} width={199.33} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: detail } = useQuery({
    queryFn: () => orderService.getOrderDetail(id),
    onError: () => {
      message.error("Đơn hàng không tồn tại");
      navigate(PATH.Profile.Order);
    },
  });

  let checkReturn;

  if (!detail) return <Loading />;
  const { status, finishedDate, _id } = detail.data;
  checkReturn =
    status === "finished" && moment(finishedDate) > moment().add(-7, "d");
  return (
    <div>
      <div className="card card-lg mb-5 border">
        <div className="card-body pb-0">
          <OrderStatus order={detail?.data} />
        </div>
        <div className="card-footer">
          <h6 className="mb-7">Order Items ({detail?.data?.totalQuantity})</h6>
          <hr className="my-5" />
          <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
            {detail?.data?.listItems?.map((e) => (
              <li className="list-group-item" key={e.productId}>
                <div className="row align-items-center">
                  <div className="col-4 col-md-3 col-xl-2">
                    {/* Image */}
                    <a href="product.html">
                      <img
                        src={e.product.thumbnail_url}
                        alt={e.product.name}
                        className="img-fluid"
                      />
                    </a>
                  </div>
                  <div className="col">
                    {/* Title */}
                    <p className="mb-4 font-size-sm font-weight-bold pr-[140px]">
                      <a className="text-body" href="product.html">
                        {e.product.name} x {e.quantity}
                      </a>{" "}
                      <br />
                      <span className="text-muted">
                        {currency(e.product.real_price)}
                      </span>
                    </p>
                    <div className="card-right-info flex gap-2 flex-col">
                      {checkReturn && (
                        <Button className="btn-xs" outline>
                          Đổi trả
                        </Button>
                      )}
                      {status === "pending" && (
                        <Button className="btn-xs" outline>
                          Hủy đơn
                        </Button>
                      )}
                      {(status === "finished" || status === "cancel") && (
                        <Button className="btn-xs" outline>
                          Mua lại
                        </Button>
                      )}
                      {status === "finished" && !e.review && (
                        <Link
                          to={`/${e.product.slug}`}
                          state={{ orderId: detail.data._id }}
                          className="btn btn-xs btn-block btn-outline-dark"
                        >
                          Viết Review
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Total */}
      <div className="card card-lg mb-5 border">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">Order Total</h6>
          {/* List group */}
          <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
            <li className="list-group-item d-flex">
              <span>Subtotal</span>
              <span className="ml-auto">
                {currency(detail?.data?.subTotal)}
              </span>
            </li>
            <li className="list-group-item d-flex">
              <span>Tax</span>
              <span className="ml-auto">{currency(detail?.data?.tax)}</span>
            </li>
            <li className="list-group-item d-flex">
              <span>Promotion</span>
              <span className="ml-auto">
                {currency(detail?.data?.promotion?.discount)}
              </span>
            </li>
            <li className="list-group-item d-flex">
              <span>Shipping</span>
              <span className="ml-auto">
                {currency(detail?.data?.shipping?.shippingPrice)}
              </span>
            </li>
            <li className="list-group-item d-flex font-size-lg font-weight-bold">
              <span>Total</span>
              <span className="ml-auto">
                {currency(detail?.data?.subTotal)}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Details */}
      <div className="card card-lg border">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">Billing &amp; Shipping Details</h6>
          {/* Content */}
          <div className="row">
            <div className="col-12 col-md-4">
              {/* Heading */}
              <p className="mb-4 font-weight-bold">Shipping Address:</p>
              <p className="mb-7 mb-md-0 text-gray-500">
                {detail?.data?.shipping?.fullName}, <br />
                {detail?.data?.shipping?.email}, <br />
                {detail?.data?.shipping?.province}, <br />
                {detail?.data?.shipping?.district}, <br />
                {detail?.data?.shipping?.address}, <br />
                {detail?.data?.shipping?.phone}
              </p>
            </div>
            <div className="col-12 col-md-4">
              {/* Heading */}
              <p className="mb-4 font-weight-bold">Shipping Method:</p>
              <p className="mb-7 text-gray-500">
                {SHIPPING[detail?.data?.shipping?.shippingMethod]}
                <br />
                (5 - 7 days)
              </p>
              {/* Heading */}
              <p className="mb-4 font-weight-bold">Payment Method:</p>
              <p className="mb-0 text-gray-500">
                {PAYMENT[detail?.data?.payment?.paymentMethod]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
