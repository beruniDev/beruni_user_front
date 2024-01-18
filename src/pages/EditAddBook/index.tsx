import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "src/components/Button";
import Loading from "src/components/Loader";
import Modal from "src/components/Modal";
import TranparentInput from "src/components/TranparentInput";
import bookMutation from "src/hooks/mutation/book";
import filesMutation from "src/hooks/mutation/files";
import useBooks from "src/hooks/useBooks";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { baseURL } from "src/main";
import { tokenSelector } from "src/store/reducers/auth";
import { useAppSelector } from "src/store/utils/types";
import {
  FileType,
  bookValues,
  detectFileType,
  inputnames,
} from "src/utils/helpers";
import { errorToast } from "src/utils/toast";

const EditAddBook = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const photo = useQueryString("photo");
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();
  const { register, reset, getValues, handleSubmit, watch, setValue } =
    useForm();
  const [images, $images] = useState<string[]>([]);
  const { data } = useBooks({ id, enabled: !!id });
  const token = useAppSelector(tokenSelector);

  const tableArr = useMemo(() => {
    return [
      { name: "Inv. №", id: 1, disabled: !token },
      {
        name: "Title",
        id: 2,
        child: [
          { name: "Title", id: 1, disabled: !token },
          { name: "Title as in manuscript", id: 2, disabled: !token },
          { name: "Known also as", id: 3, disabled: !token },
        ],
      },
      {
        name: "Author",
        id: 3,
        child: [
          { name: "Author (name)", id: 1, disabled: !token },
          { name: "Author (name) as in manuscript", id: 2, disabled: !token },
          { name: "Commentator", id: 3, disabled: !token },
          { name: "Commentator as in manuscript", id: 4, disabled: !token },
          { name: "Translator", id: 5, disabled: !token },
          {
            name: "Translator (name) as In manuscript",
            id: 6,
            disabled: !token,
          },
          { name: "Compiler", id: 7, disabled: !token },
          {
            name: "Compiler (name) as in manuscript",
            id: 8,
            disabled: !token,
          },
        ],
      },
      { name: "Date of writing", id: 4, disabled: !token },
      { name: "Language", id: 5, disabled: !token },
      { name: "Subject", id: 6, disabled: !token },
      {
        name: "Quantity of sheets",
        id: 7,
        child: [
          { name: "Quantity of sheets", id: 1, disabled: !token },
          { name: "Available illustration", id: 2, disabled: !token },
        ],
      },
      {
        name: "Lines",
        id: 8,
        child: [
          { name: "Quantity of lines", id: 1, disabled: !token },
          { name: "Quantity of columns", id: 2, disabled: !token },
        ],
      },
      { name: "Size", id: 9, disabled: !token },
      { name: "Paper", id: 10, disabled: !token },
      { name: "Copyist", id: 11, disabled: !token },
      {
        name: "Date, Place of Copying",
        id: 12,
        child: [
          { name: "Date of Copying", id: 1, disabled: !token },
          { name: "Place of Copying", id: 2, disabled: !token },
        ],
      },
      { name: "Handwriting kind", id: 13, disabled: !token },
      { name: "Cover", id: 14, disabled: !token },
      { name: "Cover color", id: 15, disabled: !token },
      { name: "Stamp of bookbinder", id: 16, disabled: !token },
      {
        name: "Text (partly)",
        id: 17,
        child: [
          { name: "Beginning", id: 1, disabled: !token },
          { name: "The existing beginning", id: 2, disabled: !token },
          { name: "Beginning after amma ba'd", id: 3, disabled: !token },
          { name: "End", id: 4, disabled: !token },
          { name: "The existing end", id: 5, disabled: !token },
          { name: "Colophon", id: 6, disabled: !token },
        ],
      },
      { name: "Defects", id: 18, disabled: !token },
      { name: "Fixation in CBP", id: 19, disabled: !token },
      { name: "Note", id: 20, disabled: !token },
      { name: "Author of description", id: 21, disabled: !token },
    ];
  }, []);

  const book = data?.items?.[0];

  const { mutate, isPending } = bookMutation();

  const { mutate: fileUpload, isPending: imagePending } = filesMutation();

  const onSubmit = () => {
    const body = Object.entries(bookValues)?.reduce((acc: any, item) => {
      if (typeof getValues(item?.[1]?.toString()) === "object")
        acc[item[0]] = getValues(item?.[1]?.toString())?.[0];
      else {
        if (getValues(item?.[1]?.toString()))
          acc[item[0]] = getValues(item?.[1]?.toString());
      }
      return acc;
    }, {});
    body.images = images?.toString();
    !!getValues("file") && (body.file = getValues("file")[0]);

    mutate(body, {
      onSuccess: () => {
        navigate("/list");
      },
      onError: (e) => errorToast(e.message),
    });
  };

  const closeModal = () => removeParams(["photo"]);

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    fileUpload(formData, {
      onSuccess: (data) => $images((prev) => [...prev, ...data?.files]),
    });
  };

  const handleFileDelete = (index: number) => () => {
    $images((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleShowPhoto = (file: string) => () => {
    if (detectFileType(file) === FileType.other)
      return window.open(`${baseURL}/${file}`);
    else navigateParams({ photo: `${baseURL}/${file}` });
  };

  const renderImage = useMemo(() => {
    if (images?.length)
      return (
        <div className="flex gap-2 w-full flex-wrap mt-4">
          {images.map((image, idx) => (
            <div className="relative h-36 w-36" key={image + idx}>
              <div
                className="border border-white rounded-full cursor-pointer bg-black absolute top-1 right-1 w-7 h-7 flex items-center justify-center"
                onClick={handleFileDelete(idx)}
              >
                <img
                  src="/assets/icons/clear.svg"
                  alt="delete"
                  className="h-3 w-3"
                />
              </div>
              <div onClick={handleShowPhoto(image)}>
                <img
                  src={`${baseURL}/${image}`}
                  alt="image"
                  height={150}
                  width={150}
                />
              </div>
            </div>
          ))}
        </div>
      );
  }, [images]);

  const renderModal = useMemo(() => {
    return (
      <Modal isOpen={!!photo} onClose={closeModal}>
        <div className={"relative"}>
          <button
            onClick={closeModal}
            className="border border-white rounded-full cursor-pointer bg-black absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
          >
            <img
              src="/assets/icons/clear.svg"
              alt="delete"
              className="w-3 h-3"
            />
          </button>

          {photo && detectFileType(photo) === FileType.photo ? (
            <img
              src={photo}
              className={"max-h-[80vh] h-full max-w-[80vw] block"}
              alt="uploaded-file"
            />
          ) : (
            <video
              src={photo || ""}
              className={"max-h-[80vh] h-full max-w-[80vw] block"}
              controls
            />
          )}
        </div>
      </Modal>
    );
  }, [photo]);

  useEffect(() => {
    if (book?.images?.length) $images((prev) => [...prev, ...book?.images]);
  }, [book?.images]);

  useEffect(() => {
    if (book && id) {
      const initialVals = Object.entries(bookValues).reduce(
        (acc: any, item) => {
          //@ts-ignore
          acc[item[1]] = book[item[0]];
          return acc;
        },
        {}
      );
      reset(initialVals);
    }
  }, [book, id]);

  useEffect(() => {
    if (!id) Object.keys(getValues()).forEach((item) => setValue(item, ""));
    if (!id) $images([]);
  }, [pathname]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="bordered w-full">
        <tbody>
          {tableArr.map((item) => {
            if (!item.child?.length)
              return (
                <tr key={item.id}>
                  <th colSpan={2}>{inputnames[`${item.id}`]}</th>
                  <td colSpan={3} className="p-0 relative">
                    <TranparentInput
                      register={register(`${item.id}`, {
                        disabled: item.disabled,
                      })}
                    />
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

                    <td colSpan={3} className="p-0 relative">
                      <TranparentInput
                        // type={item.child?.[0]?.inputType}
                        register={register(`${item.id}_${item.child[0].id}`, {
                          disabled: item.disabled,
                        })}
                      />
                    </td>
                  </tr>

                  {item.child.slice(1).map((child) => (
                    <tr key={`${item.id}_${child.id}`}>
                      <th>{inputnames[`${item.id}_${child.id}`]}</th>
                      <td className="p-0 relative">
                        <TranparentInput
                          register={register(`${item.id}_${child.id}`, {
                            disabled: item.disabled,
                          })}
                        />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              );
          })}

          {!!token && (
            <>
              <tr>
                <th colSpan={2}>File upload</th>
                <td colSpan={2}>
                  <div className="flex">
                    {!!book?.file && !!id && (
                      <div
                        onClick={handleShowPhoto(book.file)}
                        className="text-blue-500 flex-1 cursor-pointer"
                      >
                        file
                      </div>
                    )}
                    {!!watch("file")?.length &&
                      typeof watch("file") === "object" && (
                        <div
                          // onClick={handleShowPhoto(book.file)}
                          className="text-blue-500 flex-1"
                        >
                          uploaded file
                        </div>
                      )}

                    <input
                      type="file"
                      {...register("file")}
                      className="flex-1"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>Image upload</th>
                <td colSpan={2}>
                  <input type="file" multiple onChange={handleImages} />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {renderImage}

      {!!token && (
        <Button className="bg-primary my-3 text-white" type="submit">
          Save
        </Button>
      )}

      {(isPending || imagePending) && <Loading absolute />}

      {renderModal}
    </form>
  );
};

export default EditAddBook;
