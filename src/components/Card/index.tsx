import cl from "classnames";
import { FC, PropsWithChildren } from "react";
import Typography, { TextSize } from "../Typography";

interface Props extends PropsWithChildren {
  className?: string;
  title?: string;
}

const Card: FC<Props> = ({ children, className, title }) => {
  return (
    <div
      className={cl(
        "bg-gray-100 rounded-2xl w-full my-2 md:my-4 pb-4 border border-black",
        className
      )}
    >
      <div className="flex justify-between ">
        {title && (
          <div className="">
            <Typography className="flex" size={TextSize.XXL}>
              {title}
            </Typography>

            <div className="w-full h-[2px] bg-orange-400 mt-4" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;
