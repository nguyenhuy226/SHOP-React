import { Button } from "@/components/Button";
import Field from "@/components/Field";
import { useAuth } from "@/hooks/useAuth";
import { useBodyClass } from "@/hooks/useBodyClass";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { useSearch } from "@/hooks/useSearch";
import { authService } from "@/services/auth";
import { userService } from "@/services/user";
import { loginAction, loginByCodeAction } from "@/stories/auth";
import {
  confirm,
  coppyToClipboard,
  handleError,
  regexp,
  required,
} from "@/utils";
import { message } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Account() {
  useBodyClass("bg-light");
  const [search] = useSearch();
  const dispatch = useDispatch();
  const { loginLoading } = useAuth();
  const formLogin = useForm({
    username: [required(), regexp("email")],
    password: [required()],
  });
  const formRegister = useForm(
    {
      name: [required()],
      username: [required(), regexp("email")],
      password: [required()],
      confirmPassword: [confirm("password")],
    },
    {
      dependencies: {
        password: ["confirmPassword"],
      },
    }
  );
  useEffect(() => {
    if (search.code) {
      dispatch(loginByCodeAction(search.code));
    }
  }, []);
  const { loading, reFetch: registerService } = useQuery({
    enable: false,
    queryFn: async () => {
      const res = await userService.register({
        ...formRegister.values,
        redirect: window.location.origin + window.location.pathname,
      });
      return res;
    },
    limitDuration: 1000,
  });
  const onRegister = async () => {
    if (formRegister.validate()) {
      try {
        const res = await registerService();
        message.success(
          res?.message ||
            "Tạo tài khoản thành công, vui lòng kiểm tra email để kích hoạt"
        );
      } catch (error) {
        handleError(error);
      }
    }
  };
  const onLogin = async () => {
    if (formLogin.validate()) {
      try {
        await dispatch(loginAction(formLogin.values)).unwrap();
        message.success("đăng nhập thành công!");
      } catch (error) {
        handleError(error);
      }
    }
  };
  const _coppyToClipboard = (ev) => {
    coppyToClipboard(ev.target.innerText);
    message.info("coppy to clipboard");
  };
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            {/* Card */}
            <div className="card card-lg mb-10 mb-md-0">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">Returning Customer</h6>
                {/* Form */}
                <div>
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        placeholder="Email Address *"
                        {...formLogin.register("username")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field
                        placeholder="Password *"
                        type="password"
                        {...formLogin.register("password")}
                      />
                    </div>
                    <div className="col-12 col-md">
                      {/* Remember */}
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="loginRemember"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="loginRemember"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-auto">
                      {/* Link */}
                      <div className="form-group">
                        <a
                          className="font-size-sm text-reset"
                          data-toggle="modal"
                          href="#modalPasswordReset"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* Button */}
                      <Button
                        onClick={onLogin}
                        loading={loginLoading}
                        href="./account-personal-info.html"
                        className="btn btn-sm btn-dark"
                        type="submit"
                      >
                        Sign In
                      </Button>
                    </div>
                    <div className="col-12">
                      <p className="font-size-sm text-muted mt-5 mb-2 font-light">
                        Tài khoản demo:{" "}
                        <b className="text-black">
                          <span
                            className="cursor-pointer underline"
                            onClick={_coppyToClipboard}
                          >
                            demo@spacedev.com
                          </span>{" "}
                          /{" "}
                          <span
                            className="cursor-pointer underline"
                            onClick={_coppyToClipboard}
                          >
                            Spacedev@123
                          </span>
                        </b>
                      </p>
                      <p className="font-size-sm text-muted mt-5 mb-2 font-light text-justify">
                        Chúng tôi cung cấp cho bạn tài khoản demo vì mục đích
                        học tập, để đảm bảo những người khác có thể sử dụng
                        chung tài khoản chúng tôi sẽ hạn chế rất nhiều quyền
                        trên tài khoản này ví dụ: <br />
                        - Không thay đổi thông tin cá nhân, mật khẩu <br />
                        - không reset password,... <br />
                        <br />
                        Để có thể sử dụng toàn bộ chức năng trên website, vui
                        lòng tiến hành <b className="text-black">
                          đăng ký
                        </b>{" "}
                        bằng tài khoản email có thật
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            {/* Card */}
            <div className="card card-lg">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">New Customer</h6>
                {/* Form */}
                <div>
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        placeholder="Full Name *"
                        {...formRegister.register("name")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        placeholder="Email Address *"
                        {...formRegister.register("username")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      {/* Password */}
                      <Field
                        placeholder="Password *"
                        type="password"
                        {...formRegister.register("password")}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      {/* Password */}
                      <Field
                        placeholder="Confirm Password *"
                        type="password"
                        {...formRegister.register("confirmPassword")}
                      />
                    </div>
                    <div className="col-12 col-md-auto">
                      {/* Link */}
                      <div className="form-group font-size-sm text-muted font-light">
                        By registering your details, you agree with our Terms
                        &amp; Conditions, and Privacy and Cookie Policy.
                      </div>
                    </div>
                    <div className="col-12">
                      {/* Button */}
                      <Button loading={loading} onClick={onRegister}>
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
