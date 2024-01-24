import cl from "classnames";
import Typography, { TextSize, Weight } from "../Typography";
import { ReactNode } from "react";

type Props = {
  title: string;
  className?: string;
  children?: ReactNode;
};

const Title = ({ title, className, children }: Props) => {
  return (
    <div
      className={cl(
        className,
        "p-3 border-b-2 border-b-orange-400 flex justify-between"
      )}
    >
      <Typography size={TextSize.XXL} weight={Weight.bold}>
        {title}
      </Typography>

      <div className="float-end">{children}</div>
    </div>
  );
};

export default Title;
