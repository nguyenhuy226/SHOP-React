import { Button } from "@/components/Button";
import Field from "@/components/Field";
import { Portal } from "@/components/Portal";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { handleError, regexp, required } from "@/utils";
import { message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const rule = {
  fullName: [required()],
  email: [required(), regexp("email")],
  phone: [required(), regexp("phone")],
  province: [required()],
  district: [required()],
  address: [required()],
};

export default function AddressAction() {
  const form = useForm(rule);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: addressDetail, loading: getAddressLoading } = useQuery({
    enable: !!id,
    queryFn: () => userService.getAddressDetail(id),
    onSuccess: (res) => {
      form.setValues(res.data);
    },
    onError: () => {
      message.error("Sổ địa chỉ không tồn tại");
      navigate(PATH.Profile.Address);
    },
  });

  const { loading: addAddressLoading, reFetch: addAddressService } = useQuery({
    enable: false,
    queryFn: ({ params }) => userService.addAddress(...params),
  });
  const { loading: editAddressLoading, reFetch: editAddressService } = useQuery(
    {
      enable: false,
      queryFn: ({ params }) => userService.editAddress(id, ...params),
    }
  );

  const onSubmit = async () => {
    try {
      if (form.validate()) {
        await addAddressService(form.values);
        message.success("Thêm địa chỉ thành công");
        navigate(PATH.Profile.Address);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const onEdit = async () => {
    try {
      if (form.validate()) {
        await editAddressService(form.values);
        message.success("Sửa địa chỉ thành công");
        navigate(PATH.Profile.Address);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const idEdit = id;
  return (
    <>
      <Portal selector={PROFILE_TITLE_ID}>
        {idEdit ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
      </Portal>
      <Spin spinning={getAddressLoading}>
        <div className="row">
          <div className="col-12">
            <Field
              label="Full Name *"
              placeholder="Full Name *"
              {...form.register("fullName")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="Phone Number*"
              placeholder="Phone Number*"
              {...form.register("phone")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="Email Address *"
              placeholder="Email Address *"
              {...form.register("email")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="District *"
              placeholder="District *"
              {...form.register("district")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="Province / City *"
              placeholder="Province / City *"
              {...form.register("province")}
            />
          </div>
          <div className="col-12">
            <Field
              label="Address *"
              placeholder="Address *"
              {...form.register("address")}
            />
          </div>
          <div className="col-12">
            <Field
              {...form.register("default")}
              renderField={(props) => (
                <div className="custom-control custom-checkbox mb-0">
                  <input
                    onChange={(ev) => {
                      if (addressDetail && addressDetail.data.default) {
                        message.warning("Bạn không được bỏ địa chỉ mặc định");
                      } else {
                        props?.onChange?.(ev.target.checked);
                      }
                    }}
                    checked={props.value}
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultShippingAddress"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultShippingAddress"
                  >
                    Default shipping address
                  </label>
                </div>
              )}
            />
          </div>
        </div>
        {/* Button */}
        <Button
          loading={addAddressLoading || editAddressLoading}
          onClick={idEdit ? onEdit : onSubmit}
        >
          {idEdit ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Spin>
    </>
  );
}
