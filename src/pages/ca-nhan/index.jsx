import { Button } from "@/components/Button";
import Field from "@/components/Field";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { logoutAction, setUserAction } from "@/stories/auth";
import {
  confirm,
  handleError,
  minMax,
  regexp,
  required,
  validate,
} from "@/utils";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { object } from "@/utils/object";

const rule = {
  name: [required()],
  phone: [required(), regexp("phone")],
  currentPassword: [
    (_, forms) => {
      if (forms.newPassword) {
        const errorObj = validate(
          {
            currentPassword: [required(), minMax(6, 32)],
          },
          forms
        );
        return errorObj.currentPassword;
      }
    },
  ],
  newPassword: [
    (value, forms) => {
      if (forms.currentPassword) {
        if (forms.currentPassword === value) {
          return "Vui lòng không điền giống mật khẩu cũ";
        }
        const errorObj = validate(
          {
            newPassword: [required(), minMax(6, 32)],
          },
          forms
        );
        return errorObj.newPassword;
      }
    },
  ],
  confirmPassword: [confirm("newPassword")],
};
export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const userForm = useForm(rule, { initialValues: user });

  const { loadingL: changePasswordLoading, reFetch: changePasswordService } =
    useQuery({
      enable: false,
      queryFn: ({ params }) => userService.changePassword(...params),
    });

  const { loading, reFetch: updateProfileService } = useQuery({
    enable: false,
    queryFn: ({ params }) => userService.updateProfile(...params),
  });
  const onSubmit = async () => {
    const checkOldData = object.isEqual(user, userForm.values, "name", "phone");
    if (!userForm.values.newPassword && checkOldData) {
      message.warning("Vui lòng nhập thông tin để thay đổi");
    }

    if (userForm.validate()) {
      if (!checkOldData) {
        updateProfileService(userForm.values)
          .then((res) => {
            dispatch(setUserAction(res.data));
            message.success("cập nhật thông tin tài khoản thành công");
          })
          .catch(handleError);
      }

      if (userForm.values.newPassword) {
        changePasswordService({
          currentPassword: userForm.values.currentPassword,
          newPassword: userForm.values.newPassword,
        })
          .then((res) => {
            userForm.setValues({
              ...userForm.values,
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            message.success("Thay đổi mật khẩu thành công");
          })
          .catch(handleError);
      }
    }
  };

  return (
    <section className="pt-7 pb-12">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10">Thông tin cá nhân</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-10 mb-md-0">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-orders.html"
                >
                  Theo dõi đơn hàng
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-personal-info.html"
                >
                  Thông tin cá nhân
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle active"
                  href="account-wishlist.html"
                >
                  Sản phẩm yêu thích
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-address.html"
                >
                  Sổ địa chỉ
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-payment.html"
                >
                  Sổ thanh toán
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle"
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logoutAction());
                  }}
                >
                  Đăng xuất
                </a>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            {/* Form */}
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="profile-avatar">
                    <div className="wrap">
                      <img src="./img/avt.png" />
                      <i className="icon">
                        <img src="./img/icons/icon-camera.svg" />
                      </i>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  {/* Email */}
                  <Field
                    label="Full Name *"
                    placeholder="Full Name *"
                    {...userForm.register("name")}
                  />
                </div>
                <div className="col-md-6">
                  {/* Email */}
                  <Field
                    label="Phone Number *"
                    placeholder="Phone Number *"
                    {...userForm.register("phone")}
                  />
                </div>
                <div className="col-md-6">
                  {/* Email */}
                  <Field
                    label="Email"
                    placeholder="Email"
                    {...userForm.register("username")}
                    disabled
                  />
                </div>
                <div className="col-12 col-md-12">
                  {/* Password */}
                  <Field
                    type="password"
                    placeholder="Current Password"
                    label="Current Password"
                    {...userForm.register("currentPassword")}
                    autoComplete="new-password" // tắt chế độ auto fill của trình duyệt cho những input có type= passwork
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Field
                    type="password"
                    placeholder="New Password"
                    label="New Password"
                    {...userForm.register("newPassword")}
                    autoComplete="new-password"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Field
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    {...userForm.register("confirmPassword")}
                    autoComplete="new-password"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  {/* Gender */}
                  <div className="form-group mb-8">
                    <label>Gender</label>
                    <div className="btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-sm btn-outline-border active">
                        <input type="radio" name="gender" defaultChecked /> Male
                      </label>
                      <label className="btn btn-sm btn-outline-border">
                        <input type="radio" name="gender" /> Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  {/* Button */}
                  <Button onClick={onSubmit} loading={loading}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
