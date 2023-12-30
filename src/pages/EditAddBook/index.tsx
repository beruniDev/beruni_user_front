import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import TranparentInput from "src/components/TranparentInput";
import bookMutation from "src/hooks/mutation/book";
import { bookValues, inputnames } from "src/utils/helpers";

const tableArr = [
  { name: "Inv. №", id: 1 },
  {
    name: "Title",
    id: 2,
    child: [
      { name: "Title", id: 1 },
      { name: "Title as in manuscript", id: 2 },
      { name: "Known also as", id: 3 },
    ],
  },
  {
    name: "Author",
    id: 3,
    child: [
      { name: "Author (name)", id: 1 },
      { name: "Author (name) as in manuscript", id: 2 },
      { name: "Commentator", id: 3 },
      { name: "Commentator as in manuscript", id: 4 },
      { name: "Translator", id: 5 },
      { name: "Translator (name) as In manuscript", id: 6 },
      { name: "Compiler", id: 7 },
      { name: "Compiler (name) as in manuscript", id: 8 },
    ],
  },
  { name: "Date of writing", id: 4 },
  { name: "Language", id: 5 },
  { name: "Subject", id: 6 },
  {
    name: "Quantity of sheets",
    id: 7,
    child: [
      { name: "Quantity of sheets", id: 1 },
      { name: "Available illustration", id: 2 },
    ],
  },
  {
    name: "Lines",
    id: 8,
    child: [
      { name: "Quantity of lines", id: 1 },
      { name: "Quantity of columns", id: 2 },
    ],
  },
  { name: "Size", id: 9 },
  { name: "Paper", id: 10 },
  { name: "Copyist", id: 11 },
  {
    name: "Date, Place of Copying",
    id: 12,
    child: [
      { name: "Date of Copying", id: 1 },
      { name: "Place of Copying", id: 2 },
    ],
  },
  { name: "Handwriting kind", id: 13 },
  { name: "Cover", id: 14 },
  { name: "Cover color", id: 15 },
  { name: "Stamp of bookbinder", id: 16 },
  {
    name: "Text (partly)",
    id: 17,
    child: [
      { name: "Beginning", id: 1 },
      { name: "The existing beginning", id: 2 },
      { name: "Beginning after amma ba'd", id: 3 },
      { name: "End", id: 4 },
      { name: "The existing end", id: 5 },
      { name: "Colophon", id: 6 },
    ],
  },
  { name: "Defects", id: 18 },
  { name: "Fixation in CBP", id: 19 },
  { name: "Note", id: 20 },
  { name: "Author of description", id: 21 },
];

const EditAddBook = () => {
  const { register, reset, getValues, handleSubmit } = useForm();

  const { mutate } = bookMutation();

  const onSubmit = () => {
    const body = Object.entries(bookValues)?.reduce((acc: any, item) => {
      if (typeof getValues(item[1].toString()) === "object")
        acc[item[0]] = getValues(item[1].toString())[0];
      else {
        if (getValues(item[1].toString()))
          acc[item[0]] = getValues(item[1].toString());
      }
      return acc;
    }, {});

    mutate(body);
  };

  // useEffect(() => {
  //   const book: any = {};
  //   const initialVals = Object.entries(bookValues).reduce((acc: any, item) => {
  //     acc[item[1]] = book[item[0]];
  //     return acc;
  //   }, {});
  //   reset(initialVals);
  // }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">save</button>
      <table className="bordered w-full">
        <tbody>
          {tableArr.map((item) => {
            if (!item.child?.length)
              return (
                <tr key={item.id}>
                  <th colSpan={2}>{inputnames[`${item.id}`]}</th>
                  <td colSpan={3}>
                    <TranparentInput register={register(`${item.id}`)} />
                  </td>
                </tr>
              );
            else
              return (
                <Fragment key={item.id + "child"}>
                  <tr>
                    <th rowSpan={item.child.length} className="w-[150px]">
                      {inputnames[`${item.id}`]}
                    </th>

                    <th className="w-[200px]">
                      {inputnames[`${item.id}_${item.child[0].id}`]}
                    </th>

                    <td colSpan={3}>
                      <TranparentInput
                        register={register(`${item.id}_${item.child[0].id}`)}
                      />
                    </td>
                  </tr>

                  {item.child.slice(1).map((child) => (
                    <tr key={`${item.id}_${child.id}`}>
                      <th>{inputnames[`${item.id}_${child.id}`]}</th>
                      <td>
                        <TranparentInput
                          register={register(`${item.id}_${child.id}`)}
                        />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              );
          })}

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
