import cl from "classnames";
import Typography, { TextSize, Weight } from "../Typography";

type Props = {
  title: string;
  className?: string;
};

const Title = ({ title, className }: Props) => {
  return (
    <div className={cl(className, "p-3 border-b-2 border-b-orange-400")}>
      <Typography size={TextSize.XXL} weight={Weight.bold}>
        {title}
      </Typography>
    </div>
  );
};

export default Title;
