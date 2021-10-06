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
          <label htmlFor={field.name} className="text-sm mb-3 pt-13">
            {title}
          </label>

          <div className="flex  items-center bg-blue-100 w-full rounded pl-2  h-11 mb-4 shadow-2xl">
            <Icon className="text-gray-500" size={20} />
            <input
              type={type}
              placeholder={placeholder}
              {...field}
              id={field.name}
              className="py-2 h-full w-full bg-blue-100 rounded pl-1.5 outline-none text-gray-700 placeho"
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
            className="py-2 mt-3 w-full bg-blue-100 rounded pl-2 outline-none text-gray-700"
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
