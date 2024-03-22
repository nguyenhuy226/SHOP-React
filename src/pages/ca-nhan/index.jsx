import { Button } from "@/components/Button";
import Field from "@/components/Field";
import { Portal } from "@/components/Portal";
import { Radio } from "@/components/Radio";
import { UploadFile } from "@/components/UploadFile";
import { PROFILE_TITLE_ID } from "@/config";
import { avatarDefault } from "@/config/assets";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { fileService } from "@/services/file";
import { userService } from "@/services/user";
import { setUserAction } from "@/stories/auth";
import {
  confirm,
  handleError,
  minMax,
  regexp,
  required,
  validate,
} from "@/utils";
import { object } from "@/utils/object";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import { useDispatch } from "react-redux";

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
  const fileRef = useRef();
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
    let avatar;
    if (fileRef.current) {
      const res = await fileService.uploadFile(fileRef.current);
      if (res.link) {
        avatar = res.link;
      }
    }
    const checkOldData = object.isEqual(
      user,
      userForm.values,
      "name",
      "phone",
      "birthday",
      "gender"
    );
    if (!avatar && !userForm.values.newPassword && checkOldData) {
      message.warning("Vui lòng nhập thông tin để thay đổi");
    }

    if (userForm.validate()) {
      if (avatar || !checkOldData) {
        updateProfileService({ ...userForm.values, avatar })
          .then((res) => {
            dispatch(setUserAction(res.data));
            fileRef.current = null;
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
    <div>
      <Portal selector={PROFILE_TITLE_ID}>Thông tin cá nhân</Portal>
      <div className="row">
        <div className="col-12">
          <UploadFile onChange={(file) => (fileRef.current = file)}>
            {(previewSrc, trigger) => (
              <div className="profile-avatar">
                <div className="wrap" onClick={trigger}>
                  <img src={previewSrc || user.avatar || avatarDefault} />
                  <i className="icon">
                    <img src="./img/icons/icon-camera.svg" />
                  </i>
                </div>
              </div>
            )}
          </UploadFile>
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
          <Field
            label="Date of Birth"
            renderField={(props) => (
              <DatePicker
                className="form-control form-control-sm"
                onChange={(ev, date) => props.onChange(date)}
                value={props.value ? dayjs(props.value) : undefined}
                format="DD/MM/YYYY"
              />
            )}
            {...userForm.register("birthday")}
          />
        </div>
        <div className="col-12 col-lg-6">
          {/* Gender */}

          <Field
            label="Gender"
            {...userForm.register("gender")}
            renderField={(props) => (
              <div className="btn-group-toggle">
                <Radio.Group
                  defaultValue={props.value}
                  onChange={(value) => props?.onChange?.(value)}
                >
                  <Radio.Toggle value="male">Male</Radio.Toggle>
                  <Radio.Toggle value="female">Female</Radio.Toggle>
                </Radio.Group>
              </div>
            )}
          />
        </div>
        <div className="col-12">
          {/* Button */}
          <Button onClick={onSubmit} loading={loading}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
