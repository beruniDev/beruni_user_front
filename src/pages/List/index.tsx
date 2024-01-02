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

  const { data: comments, isLoading } = useBooks({
    page: currentPage,
    enabled: false,
  });

  return (
    <div>
      <div className="content">
        <ItemsCount data={comments} />
        <table className="w-full">
          <TableHead column={column} />

          {!!comments?.items?.length && (
            <tbody>
              {comments?.items?.map((comment: any, idx: number) => (
                <tr key={idx} className="bg-blue">
                  <td width="40">{handleIdx(idx)}</td>
                  <td>{comment.user?.full_name}</td>
                  <td>
                    <Link to={`/comments/${comment?.request?.id}`}>
                      {comment?.request?.id}
                    </Link>
                  </td>
                  <td>rate</td>
                  <td>{comment?.comment}</td>
                  <td>dayjs</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!!comments && <Pagination totalPages={comments.pages} />}
        {!comments?.items?.length && !isLoading && <EmptyList />}
      </div>
    </div>
  );
};

export default BookList;
