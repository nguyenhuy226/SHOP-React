import React, { useRef, useState } from "react";

export const UploadFile = ({ children, onChange }) => {
  const [imageReview, setImageReview] = useState();
  const fileRef = useRef();

  const onReview = () => {
    if (fileRef.current.files[0]) {
      const reader = new FileReader();
      onChange?.(fileRef.current.files[0]);
      reader.addEventListener("load", () => {
        setImageReview(reader.result);
      });
      reader.readAsDataURL(fileRef.current.files[0]);
      console.log(imageReview);
    }
  };
  const trigger = () => {
    fileRef.current.click();
  };
  return (
    <>
      <input
        eccept="image/*"
        type="file"
        hidden
        ref={fileRef}
        onChange={onReview}
      />
      {children(imageReview, trigger)}
    </>
  );
};
