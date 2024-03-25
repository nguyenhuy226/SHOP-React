import { Button } from "@/components/Button";
import Field from "@/components/Field";
import { Portal } from "@/components/Portal";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { handleError, regexp, required } from "@/utils";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

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

  const { loading, reFetch: addAddressService } = useQuery({
    enable: false,
    queryFn: ({ params }) => userService.addAddress(...params),
  });
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

  return (
    <>
      <Portal selector={PROFILE_TITLE_ID}>Thêm địa chỉ</Portal>

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
          <div className="form-group">
            <div className="custom-control custom-checkbox mb-0">
              <input
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
          </div>
        </div>
      </div>
      {/* Button */}
      <Button loading={loading} onClick={onSubmit}>
        Add Address
      </Button>
    </>
  );
}
