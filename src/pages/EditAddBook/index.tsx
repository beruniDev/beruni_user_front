import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseURL } from "src/api/baseApi";
import Button from "src/components/Button";
import Loading from "src/components/Loader";
import Modal from "src/components/Modal";
import Title from "src/components/Title";
import TranparentInput from "src/components/TranparentInput";
import bookMutation from "src/hooks/mutation/book";
import filesMutation from "src/hooks/mutation/files";
import useBooks from "src/hooks/useBooks";
import {
  useNavigateParams,
  useRemoveParams,
} from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { tokenSelector } from "src/store/reducers/auth";
import { useAppSelector } from "src/store/utils/types";
import {
  FileType,
  bookValues,
  detectFileType,
  inputnames,
} from "src/utils/helpers";
import { errorToast, successToast } from "src/utils/toast";

const tableArr = [
  // { name: "Inv. №", id: 1 },
  {
    name: "Country",
    id: 1,
    child: [
      { name: "Country", id: 1 },
      { name: "Establishment/Institution", id: 2 },
      { name: "Collection, code", id: 3 },
    ],
  },
  {
    name: "Author",
    id: 2,
  },
  {
    name: "Title",
    id: 3,
    child: [
      { name: "Title", id: 1 },
      { name: "Title as in manuscript", id: 2 },
      { name: "Known also as", id: 3 },
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
  // {
  //   name: "Lines",
  //   id: 8,
  //   child: [
  //     { name: "Quantity of lines", id: 1 },
  //     { name: "Quantity of columns", id: 2 },
  //   ],
  // },
  // { name: "Size", id: 9 },
  // { name: "Paper", id: 10 },
  { name: "Copyist", id: 8 },
  {
    name: "Date, Place of Copying",
    id: 9,
    child: [
      { name: "Date of Copying", id: 1 },
      { name: "Place of Copying", id: 2 },
    ],
  },
  { name: "Handwriting kind", id: 10 },
  // { name: "Cover", id: 14 },
  // { name: "Cover color", id: 15 },
  // { name: "Stamp of bookbinder", id: 16 },
  // {
  //   name: "Text (partly)",
  //   id: 17,
  //   child: [
  //     { name: "Beginning", id: 1 },
  //     { name: "The existing beginning", id: 2 },
  //     { name: "Beginning after amma ba'd", id: 3 },
  //     { name: "End", id: 4 },
  //     { name: "The existing end", id: 5 },
  //     { name: "Colophon", id: 6 },
  //   ],
  // },
  { name: "Defects", id: 11 },
  // { name: "Fixation in CBP", id: 19 },
  { name: "Note", id: 12 },
  // { name: "Author of description", id: 21 },
];

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
  const { data, refetch, isLoading, isFetching } = useBooks({
    id,
    enabled: !!id,
  });
  const token = useAppSelector(tokenSelector);

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
    body.id = id;
    !!getValues("file") && (body.file = getValues("file")[0]);

    mutate(
      { body, params: images },
      {
        onSuccess: () => {
          successToast("success");
          navigate("/list");
          if (!!id) refetch();
        },
        onError: (e) => errorToast(e.message),
      }
    );
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
      onError: (e) => errorToast(e.message),
    });
  };

  const handleFileDelete = (index: number) => () => {
    $images((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleShowPhoto = (file: string) => () => {
    if (detectFileType(file) === FileType.other)
      return window.open(`${baseURL}/files/${file}`);
    else navigateParams({ photo: `${baseURL}/${file}` });
  };

  const renderImage = useMemo(() => {
    if (images?.length)
      return (
        <div className="flex gap-2 w-full flex-wrap mt-4">
          {images.map((image, idx) => (
            <div className="relative h-36 w-36" key={image + idx}>
              {!!token && (
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
              )}
              <div onClick={handleShowPhoto(image)} className="h-full">
                <img
                  src={`${baseURL}/${image}`}
                  alt="image"
                  className="object-cover h-full w-full"
                  height={150}
                  width={150}
                />
              </div>
            </div>
          ))}
        </div>
      );
  }, [images, token]);

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

  if (isLoading || isFetching || isPending) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      {!!id && (
        <Title className="mb-4" title={"Description"}>
          <Link className="text-blue-500 underline" to={`/print/${id}`}>
            Print
          </Link>
        </Title>
      )}
      <table className="bordered w-full z-10">
        <tbody>
          {tableArr.map((item) =>
            !item.child?.length ? (
              <tr key={item.id} className="min-h-max h-full">
                <th colSpan={2} className="text-xl">
                  {inputnames[`${item.id}`]}
                </th>
                <td colSpan={3} className="p-0 relative h-14">
                  <TranparentInput
                    className="text-xl"
                    register={register(`${item.id}`, {
                      disabled: !token,
                    })}
                  />
                </td>
              </tr>
            ) : (
              <Fragment key={item.id + "child"}>
                <tr>
                  <th rowSpan={item.child.length} className="w-[150px] text-xl">
                    {inputnames[`${item.id}`]}
                  </th>

                  <th className="w-[200px] text-xl">
                    {inputnames[`${item.id}_${item.child[0].id}`]}
                  </th>

                  <td colSpan={3} className="p-0 relative h-14 text-xl">
                    <TranparentInput
                      register={register(`${item.id}_${item.child[0].id}`, {
                        disabled: !token,
                      })}
                    />
                  </td>
                </tr>

                {item?.child?.slice(1).map((child) => (
                  <tr key={`${item.id}_${child.id}`}>
                    <th className="text-xl">
                      {inputnames[`${item.id}_${child.id}`]}
                    </th>
                    <td className="p-0 relative h-14">
                      <TranparentInput
                        className="text-xl"
                        register={register(`${item.id}_${child.id}`, {
                          disabled: !token,
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </Fragment>
            )
          )}

          {!!token && (
            <>
              <tr>
                <th colSpan={2} className="text-xl">
                  File upload
                </th>
                <td colSpan={2}>
                  <div className="flex flex-wrap flex-1 flex-col md:flex-row gap-2 overflow-hidden">
                    {!!book?.file && !!id && (
                      <div
                        onClick={handleShowPhoto(book.file)}
                        className="text-blue-500 flex-1 cursor-pointer text-xl"
                      >
                        file
                      </div>
                    )}
                    {!!watch("file")?.length &&
                      typeof watch("file") === "object" && (
                        <div className="text-blue-500 flex-1 text-xl">
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
                <th colSpan={2} className="text-xl">
                  Image upload
                </th>
                <td colSpan={2} className="overflow-hidden">
                  <input
                    type="file"
                    multiple
                    onChange={handleImages}
                    className="flex flex-wrap"
                  />
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

      {(isPending || imagePending) && <Loading />}

      {renderModal}
    </form>
  );
};

export default EditAddBook;
