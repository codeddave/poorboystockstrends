import React, { FC } from "react";
import classnames from "classnames";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  disabled?: boolean;
  current?: boolean;
  width?: string;
}

export const Tab: FC<Props> = ({
  children,
  onClick = undefined,
  disabled = false,
  current = false,
  width = "1/2",
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={classnames(
        `sm:w-${width} py-2  px-3 sm:px-0 text-center font-medium cursor-pointer border-b-2 text-white text-sm md:text-base leading-snug`,
        {
          "border-blue-400 text-blue-400 font-bold  focus:text-blue-800 focus:border-blue-700":
            !disabled && current,
          "border-transparent  hover:text-gray-300 hover:font-bold focus:outline-none":
            !disabled && !current,
          "border-transparent text-gray-500 focus:outline-none italic":
            disabled,
        }
      )}
    >
      {children}
    </div>
  );
};
