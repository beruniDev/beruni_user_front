import { useForm } from "react-hook-form";
import Button from "src/components/Button";
import Title from "src/components/Title";
import TranparentInput from "src/components/TranparentInput";
import { filterHandler } from "src/store/reducers/filter";
import { useAppDispatch } from "src/store/utils/types";
import { bookValues } from "src/utils/helpers";

const Search = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset, getValues } = useForm();

  const onSubmit = () => {
    const values = Object.entries(getValues()).reduce((acc: any, item) => {
      if (!!item[1]) acc[item[0]] = item[1];
      return acc;
    }, {});
    dispatch(filterHandler(values as typeof bookValues));
  };
  return (
    <div className="flex flex-1 flex-col p-1">
      <Title title="Search" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="bordered w-full mt-4">
          <tbody>
            <tr>
              <th className="w-[300px]">Inventory number:</th>
              <td className="p-0 relative">
                <TranparentInput register={register(`inventory_number`)} />
              </td>
            </tr>
            <tr>
              <th>Title:</th>
              <td className="p-0 relative">
                <TranparentInput register={register(`title`)} />
              </td>
            </tr>
            <tr>
              <th>Author name:</th>
              <td className="p-0 relative">
                <TranparentInput register={register(`author`)} />
              </td>
            </tr>
            <tr>
              <th>Language:</th>
              <td className="p-0 relative">
                <TranparentInput register={register(`language`)} />
              </td>
            </tr>
            <tr>
              <th>Subject:</th>
              <td className="p-0 relative">
                <TranparentInput register={register(`subjects`)} />
              </td>
            </tr>
            <tr>
              <th>Illustartion:</th>
              <td className="p-0 relative">
                <TranparentInput register={register(`quantity_ill`)} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 flex gap-4">
          <Button type="submit" className="bg-gray-300">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
