import { Link } from "react-router-dom";
import EmptyList from "src/components/EmptyList";
import ItemsCount from "src/components/ItemsCount";
import Pagination from "src/components/Pagination";
import { BookTypes } from "src/utils/types";

interface Props {
  data?: BookTypes;
}

const SearchItem = ({ data: books }: Props) => {
  return (
    <>
      <ItemsCount data={books} />
      {!!books?.items?.length &&
        books?.items?.map((book, idx: number) => (
          <table key={book.inventory_number + idx} className="bordered my-2">
            <tbody>
              <tr>
                <td width={"50%"} className="bg-transparent">
                  <div className="bg-darkGray text-white font-bold px-3 py-1 w-24 text-ellipsis overflow-hidden whitespace-nowrap">
                    {book.inventory_number}
                  </div>
                </td>
                <td width={"50%"}>{book.title}</td>
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
    </>
  );
};

export default SearchItem;
