import { FC, HTMLInputTypeAttribute, useRef } from "react";
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
    <textarea
      rows={2}
      className={cl(
        "absolute inset-0 py-1 px-2 bg-transparent resize-none outline-none h-full w-full",
        className
      )}
      placeholder={placeholder || ""}
      ref={ref}
      {...register}
      {...others}
    />
  );
};

export default TranparentInput;
