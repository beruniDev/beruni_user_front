import { useForm } from "react-hook-form";
import TranparentInput from "src/components/TranparentInput";

const inputnames = {
  1: "1. Inv. №",
  2: "2. Title",
  2.1: "2.1. Title",
  2.2: "2.2. Title as in manuscript",
  2.3: "2.3. Known also as",
  3: "3. Author",
  3.1: "3.1. Author (name)",
  3.2: "3.2. Author (name) as in manuscript",
  3.3: "3.3. Commentator",
  3.4: "3.4. Commentator as in manuscript",
  3.5: "3.5. Translator",
  3.6: "3.6. Translator (name) as In manuscript",
  3.7: "3.7. Compiler",
  3.8: "3.8. Compiler (name) as in manuscript",
  4: "4. Date of writing",
  5: "5. Language",
  6: "6. Subject",
  7: "7. Quantity of sheets",
  7.1: "7.1. Quantity of sheets",
  7.2: "7.2. Available illustration",
  8: "8. Lines",
  8.1: "8.1. Quantity of lines",
  8.2: "8.2. Quantity of columns",
  9: "9. Size",
  10: "10. Paper",
  11: "11. Copyist",
  12: "12. Date, Place of Copying",
  12.1: "12.1. Date of Copying",
  12.2: "12.2. Place of Copying",
  13: "13. Handwriting kind",
  14: "14. Cover",
  15: "15. Cover color",
  16: "16. Stamp of bookbinder",
  17: "17. Text (partly)",
  17.1: "17.1. Beginning",
  17.2: "17.2. The existing beginning",
  17.3: "17.3. Beginning after amma ba'd",
  17.4: "17.4. End",
  17.5: "17.5. The existing end",
  17.6: "17.6. Colophon",
  18: "18. Defects",
  19: "19. Fixation in CBP",
  20: "20. Note",
  21: "21. Author of description",
};

// const testArr = [
//   { name: "Inv. №", id: 1 },
//   {
//     name: "Title",
//     id: 2,
//     child: [
//       { name: "Title", id: 1 },
//       { name: "Title as in manuscript", id: 2 },
//       { name: "Known also as", id: 3 },
//     ],
//   },
//   {
//     name: "Author",
//     id: 3,
//     child: [
//       { name: "Author (name)", id: 1 },
//       { name: "Author (name) as in manuscript", id: 2 },
//       { name: "Commentator", id: 3 },
//       { name: "Commentator as in manuscript", id: 4 },
//       { name: "Translator", id: 5 },
//       { name: "Translator (name) as In manuscript", id: 6 },
//       { name: "Compiler", id: 7 },
//       { name: "Compiler (name) as in manuscript", id: 8 },
//     ],
//   },
//   { name: "Date of writing", id: 4 },
//   { name: "Language", id: 5 },
//   { name: "Subject", id: 6 },
//   {
//     name: "Quantity of sheets",
//     id: 7,
//     child: [
//       { name: "Quantity of sheets", id: 1 },
//       { name: "Available illustration", id: 2 },
//     ],
//   },
//   {
//     name: "Lines",
//     id: 8,
//     child: [
//       { name: "Quantity of lines", id: 1 },
//       { name: "Quantity of columns", id: 2 },
//     ],
//   },
//   { name: "Size", id: 9 },
//   { name: "Paper", id: 10 },
//   { name: "Copyist", id: 11 },
//   {
//     name: "Date, Place of Copying",
//     id: 12,
//     child: [
//       { name: "Date of Copying", id: 1 },
//       { name: "Place of Copying", id: 2 },
//     ],
//   },
//   { name: "Handwriting kind", id: 13 },
//   { name: "Cover", id: 14 },
//   { name: "Cover color", id: 15 },
//   { name: "Stamp of bookbinder", id: 16 },
//   {
//     name: "Text (partly)",
//     id: 17,
//     child: [
//       { name: "Beginning", id: 1 },
//       { name: "The existing beginning", id: 2 },
//       { name: "Beginning after amma ba'd", id: 3 },
//       { name: "End", id: 4 },
//       { name: "The existing end", id: 5 },
//       { name: "Colophon", id: 6 },
//     ],
//   },
//   { name: "Defects", id: 18 },
//   { name: "Fixation in CBP", id: 19 },
//   { name: "Note", id: 20 },
//   { name: "Author of description", id: 21 },
// ];

const EditAddBook = () => {
  const { register, reset, getValues } = useForm();
  return (
    <form>
      <table className="bordered w-full">
        <tbody>
          <tr>
            <th colSpan={2}>{inputnames[1]}</th>
            <td colSpan={3}>
              <TranparentInput register={register(`1`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={3} className="w-[150px]">
              {inputnames[2]}
            </th>

            <th className="w-[200px]">{inputnames["2.1"]}</th>

            <td colSpan={3}>
              <TranparentInput register={register(`2.1`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["2.2"]}</th>
            <td>
              <TranparentInput register={register(`2.2`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["2.3"]}</th>
            <td>
              <TranparentInput register={register(`2.3`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={8}>{inputnames[3]}</th>

            <th>{inputnames["3.1"]}</th>

            <td>
              <TranparentInput register={register(`3.1`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3.2"]}</th>
            <td>
              <TranparentInput register={register(`3.2`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3.3"]}</th>
            <td>
              <TranparentInput register={register(`3.3`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3.4"]}</th>
            <td>
              <TranparentInput register={register(`3.4`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3.5"]}</th>
            <td>
              <TranparentInput register={register(`3.5`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3.6"]}</th>
            <td>
              <TranparentInput register={register(`3.6`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3.7"]}</th>
            <td>
              <TranparentInput register={register(`3.7`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3.8"]}</th>
            <td>
              <TranparentInput register={register(`3.8`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[4]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`4`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[5]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`5`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[6]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`6`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={2}>{inputnames[7]}</th>

            <th>{inputnames["7.1"]}</th>

            <td>
              <TranparentInput register={register(`7.1`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["7.2"]}</th>
            <td>
              <TranparentInput register={register(`7.2`)} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th rowSpan={2}>{inputnames[8]}</th>

            <th>{inputnames["8.1"]}</th>

            <td>
              <TranparentInput register={register(`8.1`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["8.2"]}</th>
            <td>
              <TranparentInput register={register(`8.2`)} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[9]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`9`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[10]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`10`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[11]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`11`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={2}>{inputnames[12]}</th>

            <th>{inputnames["12.1"]}</th>

            <td>
              <TranparentInput register={register(`12.1`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["12.2"]}</th>
            <td>
              <TranparentInput register={register(`12.2`)} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[13]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`13`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[14]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`14`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[15]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`15`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[16]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`16`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={6}>{inputnames[17]}</th>

            <th>{inputnames["17.1"]}</th>

            <td>
              <TranparentInput register={register(`17.1`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17.2"]}</th>
            <td>
              <TranparentInput register={register(`17.2`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17.3"]}</th>
            <td>
              <TranparentInput register={register(`17.3`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17.4"]}</th>
            <td>
              <TranparentInput register={register(`17.4`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17.5"]}</th>
            <td>
              <TranparentInput register={register(`17.5`)} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17.6"]}</th>
            <td>
              <TranparentInput register={register(`17.6`)} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[18]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`18`)} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[19]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`19`)} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[20]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`20`)} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[21]}</th>
            <td colSpan={2}>
              <TranparentInput register={register(`21`)} />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default EditAddBook;
