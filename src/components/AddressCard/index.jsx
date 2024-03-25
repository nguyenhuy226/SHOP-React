import React from "react";
import Skeleton from "../Skeleton";
import { withLoading } from "@/utils/withLoading";
import { withListLoading } from "@/utils/withListLoading";

function AddressCard({
  fullName,
  email,
  phone,
  province,
  district,
  address,
  default: addressDefault,
}) {
  return (
    <div className="col-12">
      {/* Card */}
      <div className="card card-lg bg-light mb-8">
        <div className="card-body">
          {/* Text */}
          <p className="font-size-sm mb-0 leading-[35px]">
            <a className="text-body text-xl font-bold " href="./product.html">
              {fullName}
            </a>{" "}
            <br />
            <b>Số điện thoại:</b> {phone} <br />
            <b>Email:</b>
            {email}
            <br />
            <b>Quận / Huyện:</b> {district} <br />
            <b>Tỉnh / thành phố:</b> {province} <br />
            <b>Địa chỉ:</b> {address}
          </p>
          <div className="card-action-right-bottom">
            {addressDefault && (
              <div className="color-success cursor-pointer">
                Địa chỉ mặc định
              </div>
            )}
          </div>
          {/* Action */}
          <div className="card-action card-action-right flex gap-2">
            {/* Button */}
            <button
              className="btn btn-xs btn-circle btn-white-primary"
              href="account-address-edit.html"
            >
              <i className="fe fe-edit-2" />
            </button>
            {!addressDefault && (
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                href="account-address-edit.html"
              >
                <i className="fe fe-x" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const AddressCardLoading = () => {
  return (
    <div className="col-12">
      {/* Card */}
      <div className="card card-lg bg-light mb-8" style={{ height: 274 }}>
        <div className="card-body">
          {/* Text */}
          <p className="flex-col flex gap-5 font-size-sm mb-0 leading-[35px]">
            <Skeleton width="65%" height={27} />
            <Skeleton width="40%" height={20} />
            <Skeleton width="54%" height={20} />
            <Skeleton width="35%" height={20} />
            <Skeleton width="35%" height={20} />
            <Skeleton width="25%" height={20} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default withLoading(AddressCard, AddressCardLoading);
export const ListAddressCard = withListLoading(AddressCard, AddressCardLoading);
