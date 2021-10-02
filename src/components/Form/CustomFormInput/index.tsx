import { FC } from "react";
import { FieldProps } from "formik";

type CustomFormInputProps = {
  title: string;
  type: string;
  icon?: any;
  placeholder?: string;
};

const CustomFormInput: FC<CustomFormInputProps & FieldProps> = ({
  type = "text",
  placeholder,
  form: { touched, errors },
  field,
  title,
  icon: Icon,
}) => {
  return (
    <>
      {Icon ? (
        <>
          <label htmlFor={field.name} className="text-sm ">
            {title}
          </label>

          <div className="flex  items-center bg-white w-full rounded pl-2  h-11">
            <Icon className="text-gray-500" size={20} />
            <input
              type={type}
              placeholder={placeholder}
              {...field}
              className="py-2 h-full w-full bg-white rounded pl-1 outline-none text-gray-700 "
            />
          </div>

          {errors[field.name] && touched[field.name] ? (
            <span className="text-red-700">{errors[field.name]}</span>
          ) : null}
        </>
      ) : (
        <>
          <label htmlFor={field.name} className="text-sm ">
            {title}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            {...field}
            className="py-2 mt-3 w-full bg-white rounded pl-2 outline-none text-gray-700"
          />
          {errors[field.name] && touched[field.name] ? (
            <span className="text-red-700">{errors[field.name]}</span>
          ) : null}
        </>
      )}
    </>
  );
};

export default CustomFormInput;
