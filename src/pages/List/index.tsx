import { useMemo } from "react";
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

const BookList = () => {
  const currentPage = Number(useQueryString("page")) || 1;
  const filter = useAppSelector(filterSelector);
  const token = useAppSelector(tokenSelector);

  const { data: books, isLoading } = useBooks({
    page: currentPage,
    ...filter,
  });

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

  return (
    <div>
      <div className="content">
        <ItemsCount data={books} />
        <table className="w-full bordered">
          <TableHead column={column} />

          {!!books?.items?.length && (
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
          )}
        </table>
        {isLoading && <Loading absolute />}
        {!!books && <Pagination totalPages={books.pages} />}
        {!books?.items?.length && !isLoading && <EmptyList />}
      </div>
    </div>
  );
};

export default BookList;
