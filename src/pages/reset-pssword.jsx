import { Button } from "@/components/Button";
import Field from "@/components/Field";
import { PATH } from "@/config";
import { useBodyClass } from "@/hooks/useBodyClass";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { getUserAction } from "@/stories/auth";
import { getCartAction } from "@/stories/cart";
import { confirm, handleError, required, setToken } from "@/utils";
import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  useBodyClass("bg-light");
  const [search] = useSearchParams();
  const code = search.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!code) {
      navigate(PATH.Account);
    }
  }, []);

  const form = useForm({
    password: [required()],
    confirmPassword: [required(), confirm("password")],
  });

  const { loading, reFetch: resetPasswordService } = useQuery({
    queryFn: () =>
      userService.resetPasswordByCode({
        password: form.values.password,
        code,
      }),
  });
  const onSubmit = async () => {
    try {
      const res = await resetPasswordService();
      message.success("Thay đổi mật khẩu thành công");
      setToken(res.data);
      dispatch(getUserAction());
      dispatch(getCartAction());
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <div className="card card-lg mb-10 mb-md-0">
              <div className="card-body">
                <h6 className="mb-7">Reset Password</h6>
                <div className="row">
                  <div className="col-12">
                    <Field
                      {...form.register("password")}
                      placeholder="Password *"
                      type="password"
                    />
                  </div>
                  <div className="col-12">
                    <Field
                      {...form.register("confirmPassword")}
                      placeholder="Confirm Password *"
                      type="password"
                    />
                  </div>
                  <div className="col-12 col-md"></div>
                  <div className="col-12">
                    {/* Button */}
                    <Button onClick={onSubmit} loading={loading}>
                      Reset Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
