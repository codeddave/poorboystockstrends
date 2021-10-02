import React, { FC } from "react";
import { FieldProps } from "formik";
import { title } from "process";

type CustomFormInputProps = {
  title: string;
  type: string;
  placeholder?: string;
};

const CustomFormInput: FC<CustomFormInputProps & FieldProps> = ({
  type,
  placeholder,
  form: { touched, errors },
  field,
}) => {
  return (
    <>
      <label htmlFor={field.name}>{title}</label>
      <input type={type} id="" placeholder={placeholder} {...field} />
    </>
  );
};

export default CustomFormInput;
