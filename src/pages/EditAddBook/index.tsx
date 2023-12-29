import { useForm } from "react-hook-form";
import TranparentInput from "src/components/TranparentInput";
import bookMutation from "src/hooks/mutation/book";
import { bookValues } from "src/utils/helpers";

const inputnames = {
  14: "14. Cover",
  15: "15. Cover color",
  16: "16. Stamp of bookbinder",
  17: "17. Text (partly)",
  "17_1": "17.1. Beginning",
  "17_2": "17.2. The existing beginning",
  "17_3": "17.3. Beginning after amma ba'd",
  "17_4": "17.4. End",
  "17_5": "17.5. The existing end",
  "17_6": "17.6. Colophon",
  18: "18. Defects",
  19: "19. Fixation in CBP",
  20: "20. Note",
  21: "21. Author of description",
  1: "1. Inv. №",
  2: "2. Title",
  "2_1": "2.1. Title",
  "2_2": "2.2. Title as in manuscript",
  "2_3": "2.3. Known also as",
  3: "3. Author",
  "3_1": "3.1. Author (name)",
  "3_2": "3.2. Author (name) as in manuscript",
  "3_3": "3.3. Commentator",
  "3_4": "3.4. Commentator as in manuscript",
  "3_5": "3.5. Translator",
  "3_6": "3.6. Translator (name) as In manuscript",
  "3_7": "3.7. Compiler",
  "3_8": "3.8. Compiler (name) as in manuscript",
  4: "4. Date of writing",
  5: "5. Language",
  6: "6. Subject",
  7: "7. Quantity of sheets",
  "7_1": "7.1. Quantity of sheets",
  "7_2": "7.2. Available illustration",
  8: "8. Lines",
  "8_1": "8.1. Quantity of lines",
  "8_2": "8.2. Quantity of columns",
  9: "9. Size",
  10: "10. Paper",
  11: "11. Copyist",
  12: "12. Date, Place of Copying",
  "12_1": "12.1. Date of Copying",
  "12_2": "12.2. Place of Copying",
  13: "13. Handwriting kind",
};

const EditAddBook = () => {
  const { register, reset, getValues, handleSubmit } = useForm();

  const { mutate } = bookMutation();

  const onSubmit = () => {
    console.log(getValues("files"), "files");
    const body = Object.entries(bookValues)?.reduce((acc: any, item) => {
      if (!!getValues(item[1].toString()).length)
        acc[item[0]] = getValues(item[1].toString())[0];
      else {
        if (getValues(item[1].toString()))
          acc[item[0]] = getValues(item[1].toString());
      }
      return acc;
    }, {});

    console.log(body, "nod");
    mutate(body);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">save</button>
      <table className="bordered w-full">
        <tbody>
          <tr>
            <th colSpan={2}>{inputnames[1]}</th>
            <td colSpan={3}>
              <TranparentInput register={register("1")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={3} className="w-[150px]">
              {inputnames[2]}
            </th>

            <th className="w-[200px]">{inputnames["2_1"]}</th>

            <td colSpan={3}>
              <TranparentInput register={register("2_1")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["2_2"]}</th>
            <td>
              <TranparentInput register={register("2_2")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["2_3"]}</th>
            <td>
              <TranparentInput register={register("2_3")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={8}>{inputnames[3]}</th>

            <th>{inputnames["3_1"]}</th>

            <td>
              <TranparentInput register={register("3_1")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3_2"]}</th>
            <td>
              <TranparentInput register={register("3_2")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3_3"]}</th>
            <td>
              <TranparentInput register={register("3_3")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3_4"]}</th>
            <td>
              <TranparentInput register={register("3_4")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3_5"]}</th>
            <td>
              <TranparentInput register={register("3_5")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3_6"]}</th>
            <td>
              <TranparentInput register={register("3_6")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3_7"]}</th>
            <td>
              <TranparentInput register={register("3_7")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["3_8"]}</th>
            <td>
              <TranparentInput register={register("3_8")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[4]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("4")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[5]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("5")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[6]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("6")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={2}>{inputnames[7]}</th>

            <th>{inputnames["7_1"]}</th>

            <td>
              <TranparentInput register={register("7_1")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["7_2"]}</th>
            <td>
              <TranparentInput register={register("7_2")} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th rowSpan={2}>{inputnames[8]}</th>

            <th>{inputnames["8_1"]}</th>

            <td>
              <TranparentInput register={register("8_1")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["8_2"]}</th>
            <td>
              <TranparentInput register={register("8_2")} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[9]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("9")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[10]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("10")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[11]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("11")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={2}>{inputnames[12]}</th>

            <th>{inputnames["12_1"]}</th>

            <td>
              <TranparentInput register={register("12_1")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["12_2"]}</th>
            <td>
              <TranparentInput register={register("12_2")} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[13]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("13")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[14]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("14")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[15]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("15")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[16]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("16")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th rowSpan={6}>{inputnames[17]}</th>

            <th>{inputnames["17_1"]}</th>

            <td>
              <TranparentInput register={register("17_1")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17_2"]}</th>
            <td>
              <TranparentInput register={register("17_2")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17_3"]}</th>
            <td>
              <TranparentInput register={register("17_3")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17_4"]}</th>
            <td>
              <TranparentInput register={register("17_4")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17_5"]}</th>
            <td>
              <TranparentInput register={register("17_5")} />
            </td>
          </tr>
          <tr>
            <th>{inputnames["17_6"]}</th>
            <td>
              <TranparentInput register={register("17_6")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[18]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("18")} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[19]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("19")} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[20]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("20")} />
            </td>
          </tr>
          {/* ======================================== */}

          <tr>
            <th colSpan={2}>{inputnames[21]}</th>
            <td colSpan={2}>
              <TranparentInput register={register("21")} />
            </td>
          </tr>

          {/* ======================================== */}

          <tr>
            <th colSpan={2}>File upload</th>
            <td colSpan={2}>
              <input type="file" {...register("file")} />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default EditAddBook;
