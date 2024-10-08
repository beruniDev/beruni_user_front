import { useEffect } from "react";
import { Link } from "react-router-dom";
import EmptyList from "src/components/EmptyList";
import ItemsCount from "src/components/ItemsCount";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import useBooks from "src/hooks/useBooks";
import useQueryString from "src/hooks/useQueryString";
import { filterSelector } from "src/store/reducers/filter";
import { useAppSelector } from "src/store/utils/types";
import { handleIdx } from "src/utils/helpers";

const column = [
  { name: "№", key: "id" },
  { name: "Title", key: "purchaser" },
  { name: "Author", key: "id" },
  { name: "Language", key: "rate" },
  { name: "Date of writing", key: "date" },
  { name: "", key: "" },
];

const BookList = () => {
  const currentPage = Number(useQueryString("page")) || 1;
  const filter = useAppSelector(filterSelector);

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
    <div className="content md:mb-4 withBg">
      <ItemsCount data={books} />
      <table className="w-full bordered mb-4 z-10">
        <TableHead column={column} />

        {!!books?.items?.length && (
          <tbody>
            {books?.items?.map((book, idx: number) => (
              <tr key={idx}>
                <td width="40">{handleIdx(idx)}</td>
                <td className="min-w-[150px]">{book.title}</td>
                <td className="min-w-[150px]">{book?.author}</td>
                <td className="min-w-[150px]">{book.language}</td>
                <td className="min-w-[150px]">{book.date_written}</td>
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
      {isLoading && <Loading />}
      {!!books && <Pagination totalPages={books.pages} />}
      {!books?.items?.length && !isLoading && <EmptyList />}
    </div>
  );
};

export default BookList;
