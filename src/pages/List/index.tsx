import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import EmptyList from "src/components/EmptyList";
import ItemsCount from "src/components/ItemsCount";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import useBooks from "src/hooks/useBooks";
import useQueryString from "src/hooks/useQueryString";
import { tokenSelector } from "src/store/reducers/auth";
import { filterSelector } from "src/store/reducers/filter";
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

const BookList = () => {
  const currentPage = Number(useQueryString("page")) || 1;
  const filter = useAppSelector(filterSelector);
  const token = useAppSelector(tokenSelector);

  const {
    data: books,
    isLoading,
    refetch,
  } = useBooks({
    page: currentPage,
    ...filter,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="content mb-4">
      <ItemsCount data={books} />
      <table className="w-full bordered mb-4">
        <TableHead column={column} />

        {!!books?.items?.length && (
          <tbody>
            {books?.items?.map((book, idx: number) => (
              <tr key={idx}>
                <td width="40">{handleIdx(idx)}</td>
                <td>{book.title}</td>
                <td>{book?.author}</td>
                <td>{book.language}</td>
                <td>{book?.descript_auth}</td>
                <td>{book.date_written}</td>
                <td className="!w-8">
                  <Link
                    to={`/list/${book?.id}`}
                    className="text-blue-500 underline"
                  >
                    more
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {isLoading && <Loading absolute />}
      {!!books && <Pagination totalPages={books.pages} />}
      {!books?.items?.length && !isLoading && <EmptyList />}
    </div>
  );
};

export default BookList;
