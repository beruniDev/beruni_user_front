import { FC, HTMLInputTypeAttribute } from "react";
import cl from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  className?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  onFocus?: () => void;
  ref?: any;
}

const TranparentInput: FC<Props> = ({
  className,
  placeholder = "",
  register,
  ref,
  ...others
}) => {
  return (
    <input
      className={cl("absolute inset-0 py-1 px-2 bg-transparent", className)}
      placeholder={placeholder || ""}
      ref={ref}
      {...register}
      {...others}
    />
  );
};

export default TranparentInput;
