import { Link } from "react-router-dom";
import EmptyList from "src/components/EmptyList";
import ItemsCount from "src/components/ItemsCount";
import Pagination from "src/components/Pagination";
import TableHead from "src/components/TableHead";
import useBooks from "src/hooks/useBooks";
import useQueryString from "src/hooks/useQueryString";
import { handleIdx } from "src/utils/helpers";

const column = [
  { name: "№", key: "id" },
  { name: "name", key: "purchaser" },
  { name: "Author", key: "id" },
  { name: "Language", key: "rate" },
  { name: "Author of description", key: "status" },
  { name: "Date of writing", key: "date" },
];

const BookList = () => {
  const currentPage = Number(useQueryString("page")) || 1;

  const { data: books, isLoading } = useBooks({
    page: currentPage,
  });

  return (
    <div>
      <div className="content">
        <ItemsCount data={books} />
        <table className="w-full">
          <TableHead column={column} />

          {!!books?.items?.length && (
            <tbody>
              {books?.items?.map((book, idx: number) => (
                <tr key={idx} className="bg-blue">
                  <td width="40">{handleIdx(idx)}</td>
                  <td>
                    <Link to={`/admin/book/${book?.id}`}>{book.title}</Link>
                  </td>
                  <td>{book?.author}</td>
                  <td>{book.language}</td>
                  <td>{book?.descript_auth}</td>
                  <td>{book.date_written}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!!books && <Pagination totalPages={books.pages} />}
        {!books?.items?.length && !isLoading && <EmptyList />}
      </div>
    </div>
  );
};

export default BookList;
