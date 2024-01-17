import { ChangeEvent, useState, KeyboardEvent, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Loading from "src/components/Loader";
import TableHead from "src/components/TableHead";
import Title from "src/components/Title";
import useBookSearch from "src/hooks/useBookSearch";
import { tokenSelector } from "src/store/reducers/auth";
import { useAppSelector } from "src/store/utils/types";
import { handleIdx } from "src/utils/helpers";

const Search = () => {
  const [text, $text] = useState<string>();
  const token = useAppSelector(tokenSelector);

  const {
    data: books,
    isLoading,
    refetch,
    isFetching,
  } = useBookSearch({ enabled: false, text: text! });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    $text(e.target.value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !!text) refetch();
  };

  const column = useMemo(() => {
    const init = [
      { name: "№", key: "id" },
      { name: "name", key: "purchaser" },
      { name: "Author", key: "id" },
      { name: "Language", key: "rate" },
      { name: "Author of description", key: "status" },
      { name: "Date of writing", key: "date" },
    ];
    if (token) init.push({ name: "", key: "" });

    return init;
  }, []);

  const onSubmit = () => {
    if (!!text) refetch();
  };

  return (
    <div className="flex flex-1 flex-col p-1">
      <Title title="Search" />

      <div className="mt-10 flex gap-4 md:flex-row flex-col">
        <BaseInput className="flex flex-1">
          <MainInput onChange={handleChange} onKeyDown={handleKeyDown} />
        </BaseInput>

        <Button className="bg-gray-300 w-full md:w-52" onClick={onSubmit}>
          Search
        </Button>
      </div>

      {!!books?.items?.length && (
        <table className="w-full bordered my-4">
          <TableHead column={column} />

          <tbody>
            {books?.items?.map((book, idx: number) => (
              <tr key={idx} className="bg-blue">
                <td width="40">{handleIdx(idx)}</td>
                <td>{book.title}</td>
                <td>{book?.author}</td>
                <td>{book.language}</td>
                <td>{book?.descript_auth}</td>
                <td>{book.date_written}</td>
                {!!token && (
                  <td>
                    <Link
                      to={`/admin/list/${book?.id}`}
                      id="edit_item"
                      className="text-blue-500"
                    >
                      <img
                        className={"h-4 w-4 cursor-pointer"}
                        src="/assets/icons/edit.svg"
                        alt="edit"
                      />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {(isLoading || isFetching) && <Loading absolute />}
    </div>
  );
};

export default Search;
