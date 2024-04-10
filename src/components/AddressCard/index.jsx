import { PATH } from "@/config";
import { useAction } from "@/hooks/useAction";
import { userService } from "@/services/user";
import { cn } from "@/utils";
import { withListLoading } from "@/utils/withListLoading";
import { withLoading } from "@/utils/withLoading";
import { Link, generatePath } from "react-router-dom";
import { Button } from "../Button";
import Skeleton from "../Skeleton";
import { AddressCardStyle } from "./style";

export default function AddressCard({
  action,
  className,
  hideAction,
  _id,
  fullName,
  email,
  phone,
  province,
  district,
  address,
  default: addressDefault,
  onGetAddressDefault,
  onClick,
}) {
  // const flagRemoveAddress = useRef(false);

  // const onChangeAddressDefault = async () => {
  //   try {
  //     const key = "change-address-default";
  //     message.loading({
  //       key,
  //       content: "Thao tác đang được thực hiện",
  //     });
  //     await userService.editAddress(_id, { default: true });
  //     onGetAddressDefault?.();
  //     message.success({
  //       key,
  //       content: "Thay đổi địa chỉ mặc định thành công",
  //     });
  //   } catch (error) {
  //     handleError(error, key);
  //   }
  // };
  const onChangeAddressDefault = useAction({
    service: () => userService.editAddress(_id, { default: true }),
    loadingMessage: "Thao tác đang được thực hiện",
    successMessage: "Thay đổi địa chỉ mặc định thành công",
    onSuccess: onGetAddressDefault,
  });

  const _onDeleteAddress = useAction({
    service: () => userService.removeAddress(_id),
    loadingMessage: "Đang xóa địa chỉ",
    successMessage: "Xóa địa chỉ thành công",
    reTry: false,
    onSuccess: onGetAddressDefault,
  });
  // const _onDeleteAddress = async () => {
  //   if (flagRemoveAddress.current) return;
  //   flagRemoveAddress.current = true;
  //   try {
  //     const key = "delete-address";
  //     message.loading({
  //       key,
  //       content: "Đang xóa địa chỉ",
  //     });
  //     await userService.removeAddress(_id);
  //     onGetAddressDefault?.();
  //     message.success({
  //       key,
  //       content: "Xóa địa chỉ thành công",
  //     });
  //   } catch (error) {
  //     handleError(error, key);
  //   }
  // };
  return (
    <AddressCardStyle className="col-12" onClick={onClick}>
      {/* Card */}
      <div className={cn("card card-lg bg-light mb-8", className)}>
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
          {!hideAction && (
            <div className="card-action-right-bottom">
              {addressDefault ? (
                <div className="color-success cursor-pointer">
                  Địa chỉ mặc định
                </div>
              ) : (
                <Button
                  onClick={onChangeAddressDefault}
                  outline
                  className="hidden btn-change-default btn-xs"
                >
                  Đặt làm địa chỉ mặc định
                </Button>
              )}
            </div>
          )}

          {/* Action */}
          {!hideAction && (
            <div className="card-action card-action-right flex gap-2">
              {/* Button */}
              <Link
                className="btn btn-xs btn-circle btn-white-primary"
                to={generatePath(PATH.Profile.EditAddress, { id: _id })}
              >
                <i className="fe fe-edit-2" />
              </Link>
              {!addressDefault && (
                <button
                  onClick={_onDeleteAddress}
                  className="btn btn-xs btn-circle btn-white-primary"
                  href="account-address-edit.html"
                >
                  <i className="fe fe-x" />
                </button>
              )}
            </div>
          )}
          {action}
        </div>
      </div>
    </AddressCardStyle>
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

export const WithAddressLoading = withLoading(AddressCard, AddressCardLoading);
export const ListAddressCard = withListLoading(AddressCard, AddressCardLoading);
