import { Link, useParams } from "react-router-dom";
import Loading from "src/components/Loader";
import Title from "src/components/Title";
import useBooks from "src/hooks/useBooks";

const UsersView = () => {
  const { id } = useParams();
  const { data, isLoading } = useBooks({ id, enabled: !!id });

  const book = data?.items?.[0];

  if (isLoading) return <Loading absolute />;

  return (
    <div className="">
      <Title title={"Description"} />
      <table className="bordered my-2">
        <tbody>
          <tr>
            <td className="bg-transparent">
              <span className="bg-darkGray text-white font-bold px-3 py-1 ">
                {book?.inventory_number}
              </span>
            </td>
            <td>some title</td>
          </tr>
          <tr className="bg-mainGray">
            <td className="font-bold">Author name</td>
            <td>{book?.author}</td>
          </tr>
          <tr className="bg-lightGray">
            <td className="font-bold">Language</td>
            <td>{book?.language}</td>
          </tr>
          <tr>
            <td className="bg-mainGray" colSpan={2}>
              <div className="flex w-full">
                <Link
                  to={`/list/${book?.id}`}
                  className="text-blue-500 underline text-right flex-1 "
                >
                  more information
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
