import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import Title from "src/components/Title";
import TranparentInput from "src/components/TranparentInput";
import { tokenSelector } from "src/store/reducers/auth";
import { filterHandler, filterSelector } from "src/store/reducers/filter";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { bookValues } from "src/utils/helpers";

const DetailedSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filter = useAppSelector(filterSelector);
  const token = useAppSelector(tokenSelector);
  const { register, handleSubmit, reset, getValues, setValue } = useForm();

  const onSubmit = () => {
    const values = Object.entries(getValues()).reduce((acc: any, item) => {
      if (!!item[1]) acc[item[0]] = item[1];
      return acc;
    }, {});
    dispatch(filterHandler(values as typeof bookValues));
    navigate("/list");
  };

  const handleReset = () => {
    dispatch(filterHandler(undefined));
    Object.keys(getValues()).forEach((item) => setValue(item, ""));
  };

  useEffect(() => {
    reset(filter);
  }, []);

  return (
    <div className="flex flex-1 flex-col p-1 withBg">
      <Title title={!token ? "Detailed search" : "Filter"} />
      <form className="z-10" onSubmit={handleSubmit(onSubmit)}>
        <table className="bordered w-full mt-4">
          <tbody>
            <tr>
              <th className="md:w-[300px] w-40">Inventory number:</th>
              <td className="p-0 relative">
                <TranparentInput register={register("inventory_number")} />
              </td>
            </tr>
            <tr>
              <th>Title:</th>
              <td className="p-0 relative">
                <TranparentInput register={register("title")} />
              </td>
            </tr>
            <tr>
              <th>Author name:</th>
              <td className="p-0 relative">
                <TranparentInput register={register("author")} />
              </td>
            </tr>
            <tr>
              <th>Language:</th>
              <td className="p-0 relative">
                <TranparentInput register={register("language")} />
              </td>
            </tr>
            <tr>
              <th>Subject:</th>
              <td className="p-0 relative">
                <TranparentInput register={register("subjects")} />
              </td>
            </tr>
            <tr>
              <th>Illustartion:</th>
              <td className="p-0 relative">
                <TranparentInput register={register("quantity_ill")} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 flex gap-4">
          <Button type="submit" className="bg-gray-300">
            Apply
          </Button>
          <Button onClick={handleReset} className="bg-blue-600 text-white">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailedSearch;
