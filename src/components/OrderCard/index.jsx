import { PATH } from "@/config";
import { withListLoading } from "@/utils/withListLoading";
import moment from "moment";
import { generatePath, Link } from "react-router-dom";
import { Button } from "../Button";
import { OrderStatus } from "../OrderStatus";
import Skeleton from "../Skeleton";

const Loading = () => {
  return (
    <div className="card card-lg mb-5 border">
      <div className="card-body pb-0">
        {/* Info */}
        <div className="card card-sm">
          <Skeleton height={98.49} />
        </div>
      </div>
      <div className="card-footer">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="form-row mb-4 mb-lg-0">
              <div className="col-3">
                <Skeleton className="embed-responsive embed-responsive-1by1 bg-cover" />
              </div>
              <div className="col-3">
                <Skeleton className="embed-responsive embed-responsive-1by1 bg-cover" />
              </div>
              <div className="col-3">
                <Skeleton className="embed-responsive embed-responsive-1by1 bg-cover" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="flex justify-end gap-3">
              <Skeleton height={40} width={100} />
              <Skeleton height={40} width={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderCard = (props) => {
  const { status, total, _id, createAt, listItems, finishedDate } = props;
  const checkReturn =
    status === "finished" && moment(finishedDate) > moment().add(-7, "d");
  const date = moment(status === "finsihed" ? finishedDate : createAt);
  return (
    <div className="card card-lg mb-5 border">
      <div className="card-body pb-0">
        {/* Info */}
        <OrderStatus order={props} />
      </div>
      <div className="card-footer">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="form-row mb-4 mb-lg-0">
              {listItems?.slice(0, 3)?.map((e) => (
                <div className="col-3" key={e.productId}>
                  {/* Image */}
                  <div
                    className="embed-responsive embed-responsive-1by1 bg-cover"
                    style={{
                      backgroundImage: `url(${e.product.thumbnail_url})`,
                    }}
                  />
                </div>
              ))}
              {listItems.length === 4 && (
                <div className="col-3">
                  {/* Image */}
                  <div
                    className="embed-responsive embed-responsive-1by1 bg-cover"
                    style={{
                      backgroundImage: `url(${listItems[3].product.thumbnail_url})`,
                    }}
                  />
                </div>
              )}
              {listItems.length > 4 && (
                <div className="col-3">
                  <div className="embed-responsive embed-responsive-1by1 bg-light">
                    <a className="embed-responsive-item embed-responsive-item-text text-reset">
                      <div className="font-size-xxs font-weight-bold">
                        +{listItems.length - 3}
                        <br />
                        ảnh
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="flex justify-end gap-3">
              {/* <a className="btn btn-xs btn-outline-dark" href="#!">
                Hủy đơn
              </a>
              <a
                className="btn btn-xs btn-outline-dark"
                href="account-order.html"
              >
                Xem chi tiết
              </a> */}
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
              <Link
                className="btn btn-xs btn-outline-dark"
                to={generatePath(PATH.Profile.OrderDetail, {
                  id: _id,
                })}
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListOrderCard = withListLoading(OrderCard, Loading);
