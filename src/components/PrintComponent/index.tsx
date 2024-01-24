import { useParams } from "react-router-dom";
import useBooks from "src/hooks/useBooks";
import Loading from "../Loader";

const PrintComponent = () => {
  const { id } = useParams();
  const { data, isLoading } = useBooks({ id, enabled: !!id });
  const book = data?.items?.[0];

  if (isLoading) return <Loading absolute />;

  return (
    <div className="absolute inset-0 bg-gray-500 z-[10001]">
      <table className="w-[1000px] bordered">
        <tbody>
          <tr>
            <th>Inventory number</th>
            <td className="text-right">{book?.inventory_number}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td className="text-right">{book?.title}</td>
          </tr>
          <tr>
            <th>Known also as</th>
            <td className="text-right">{book?.title_known}</td>
          </tr>
          <tr>
            <th>Author name</th>
            <td className="text-right">{book?.author}</td>
          </tr>
          <tr>
            <th>Date of writing</th>
            <td className="text-right">{book?.date_written}</td>
          </tr>
          <tr>
            <th>Language</th>
            <td className="text-right">{book?.language}</td>
          </tr>
          <tr>
            <th>Subjects</th>
            <td className="text-right">{book?.subjects}</td>
          </tr>
          <tr>
            <th>Quantity of sheets</th>
            <td className="text-right">{book?.quantity_sheet}</td>
          </tr>
          <tr>
            <th>Illustrations</th>
            <td className="text-right">{book?.quantity_ill}</td>
          </tr>
          <tr>
            <th>Quantity of lines</th>
            <td className="text-right">{book?.lines}</td>
          </tr>
          <tr>
            <th>Quantity of columns</th>
            <td className="text-right">{book?.lines}</td>
          </tr>
          <tr>
            <th>Size</th>
            <td className="text-right">{book?.size}</td>
          </tr>
          <tr>
            <th>Paper</th>
            <td className="text-right">{book?.paper}</td>
          </tr>
          <tr>
            <th>Date of copying</th>
            <td className="text-right">{book?.copy_date}</td>
          </tr>
          <tr>
            <th>Place of copying</th>
            <td className="text-right">{book?.copy_place}</td>
          </tr>
          <tr>
            <th>Handwriting kinds</th>
            <td className="text-right">{book?.type_handwriting}</td>
          </tr>
          <tr>
            <th>Cover types</th>
            <td className="text-right">{book?.cover}</td>
          </tr>
          <tr>
            <th>Cover colors</th>
            <td className="text-right">{book?.cover_color}</td>
          </tr>
          <tr>
            <th>Stamp of bookbinder</th>
            <td className="text-right">{book?.stamp}</td>
          </tr>
          <tr>
            <th>Beginning</th>
            <td className="text-right">{book?.text_begin}</td>
          </tr>
          <tr>
            <th>Beginning after amma baʻd</th>
            <td className="text-right">{book?.text_ammabegin}</td>
          </tr>
          <tr>
            <th>End</th>
            <td className="text-right">{book?.text_end}</td>
          </tr>
          <tr>
            <th>Colophon</th>
            <td className="text-right">{book?.colophon}</td>
          </tr>
          <tr>
            <th>Defects</th>
            <td className="text-right">{book?.defects} </td>
          </tr>
          <tr>
            <th>Fixation in CBP</th>
            <td className="text-right">{book?.fixation}</td>
          </tr>
          <tr>
            <th>Note</th>
            <td className="text-right">{book?.note}</td>
          </tr>
          {/* <tr>
          <th ></th>
          <td className="text-right">MUSAEV SH.</td>
        </tr> */}
          <tr>
            <th></th>
            <td className="text-right">{book?.inventory_number}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintComponent;
