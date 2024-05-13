import { ChangeEvent, useState, KeyboardEvent, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import EmptyList from "src/components/EmptyList";
import ItemsCount from "src/components/ItemsCount";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import Title from "src/components/Title";
import useBookSearch from "src/hooks/useBookSearch";
import { tokenSelector } from "src/store/reducers/auth";
import { useAppSelector } from "src/store/utils/types";
import { handleIdx } from "src/utils/helpers";

const column = [
  { name: "№", key: "id" },
  { name: "name", key: "purchaser" },
  { name: "Author", key: "id" },
  { name: "Language", key: "rate" },
  { name: "Author of description", key: "status" },
  { name: "Date of writing", key: "date" },
  { name: "", key: "" },
];

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

  const onSubmit = () => {
    if (!!text) refetch();
  };

  return (
    <div className="flex flex-1 flex-col p-1 withBg">
      <Title title="Search" />

      <div className="mt-10 flex gap-4 md:flex-row flex-col">
        <BaseInput className="flex flex-1">
          <MainInput onChange={handleChange} onKeyDown={handleKeyDown} />
        </BaseInput>

        <Button className="w-full md:w-52" onClick={onSubmit}>
          Search
        </Button>
      </div>

      <ItemsCount data={books} />
      {!!books?.items?.length &&
        books?.items?.map((book, idx: number) => (
          <table key={book.inventory_number + idx} className="bordered my-2">
            <tbody>
              <tr>
                <td className="bg-transparent">
                  <span className="bg-darkGray text-white font-bold px-3 py-1 ">
                    {book.inventory_number}
                  </span>
                </td>
                <td>some title</td>
              </tr>
              <tr className="bg-mainGray">
                <td className="font-bold">Author name</td>
                <td>{book.author}</td>
              </tr>
              <tr className="bg-lightGray">
                <td className="font-bold">Language</td>
                <td>{book.language}</td>
              </tr>
              <tr>
                <td className="bg-mainGray" colSpan={2}>
                  <div className="flex w-full">
                    <Link
                      to={`/list/${book.id}`}
                      className="text-blue-500 underline text-right flex-1 "
                    >
                      more information
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}

      {books?.total === 0 && <EmptyList />}
      {!!books && <Pagination totalPages={books.pages} />}
      {(isLoading || isFetching) && <Loading />}
    </div>
  );
};

export default Search;
