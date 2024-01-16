import { FC } from "react";

interface Props {
  title?: string;
}

const EmptyList: FC<Props> = ({ title = "Empty list" }) => {
  return (
    <div className="w-full my-4">
      <p className="text-center w-100 ">{title}</p>
    </div>
  );
};

export default EmptyList;
