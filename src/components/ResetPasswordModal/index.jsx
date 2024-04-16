import { useForm } from "@/hooks/useForm";
import { handleError, regexp, required } from "@/utils";
import { message, Modal } from "antd";
import React from "react";
import Field from "../Field";
import { Button } from "../Button";
import { useQuery } from "@/hooks/useQuery";
import { userService } from "@/services/user";
import { redirect } from "react-router-dom";
import { PATH } from "@/config";

export const ResetPasswordModal = ({ open, onClose }) => {
  const { loading, reFetch: resetPasswordService } = useQuery({
    enable: false,
    queryFn: () =>
      userService.resetPassword({
        ...form.values,
        redirect: window.location.origin + PATH.ResetPassword,
      }),
  });
  const form = useForm({
    username: [
      required("Email là bắt buộc"),
      regexp("email", "Vui lòng điền đúng định dạng email"),
    ],
  });
  const onSubmit = async () => {
    try {
      if (form.validate()) {
        const res = await resetPasswordService();
        message.success(res.message);
        onClose?.();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      closeIcon={<></>}
      footer={null}
      centered
      width={500}
    >
      <div className="modal-content">
        {/* Close */}
        <button
          onClick={onClose}
          type="button"
          className="close !outline-none"
          data-dismiss="modal"
          aria-label="Close"
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Forgot Password?</strong>
        </div>
        {/* Body */}
        <div className="modal-body text-center">
          {/* Text */}
          <p className="mb-7 font-size-sm text-gray-500">
            Please enter your Email Address. You will receive a link to create a
            new password via Email.
          </p>
          {/* Form */}

          {/* Email */}
          <Field {...form.register("username")} placeholder="Email Address *" />
          {/* Button */}
          <div className="flex justify-center">
            <Button loading={loading} onClick={onSubmit}>
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
