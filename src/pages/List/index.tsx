import { Link, useNavigate } from "react-router-dom";
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
  { name: "", key: "" },
];

const BookList = () => {
  const navigate = useNavigate();
  const currentPage = Number(useQueryString("page")) || 1;

  const { data: books, isLoading } = useBooks({
    page: currentPage,
  });

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
                  <td>
                    <Link
                      to={`/admin/book/${book?.id}`}
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
