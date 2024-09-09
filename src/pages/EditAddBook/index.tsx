import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseURL } from "src/api/baseApi";
import Button from "src/components/Button";
import Linkify from "src/components/Linkify";
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
import { FileType, bookValues, detectFileType } from "src/utils/helpers";
import { errorToast, successToast } from "src/utils/toast";

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

  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState("");
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e: any) => {
    setNote(e.target.value);
  };

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
          {images?.map((image, idx) => (
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

  const renderNote = useMemo(() => {
    // Detect URLs in the text and convert them to clickable links
    return (
      <Linkify
        text={note}
        className="absolute inset-0 py-1 px-2 bg-transparent h-full w-full"
      />
    );
  }, [note, isEditing, book?.note]);

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
      setNote(book?.note);
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
          <tr>
            <th rowSpan={3} className="w-[150px] text-xl">
              1. Country
            </th>
            <th className="w-[200px] text-xl">1.1 Country</th>
            <td colSpan={3} className="p-0 relative h-14 text-xl">
              <TranparentInput
                register={register("1_1", { disabled: !token })}
              />
            </td>
          </tr>
          <tr>
            <th className="text-xl">1.2 Establishment/Institution</th>
            <td className="p-0 relative h-14">
              <TranparentInput
                register={register("1_2", { disabled: !token })}
              />
            </td>
          </tr>
          <tr>
            <th className="text-xl">1.3 Collection, code</th>
            <td className="p-0 relative h-14">
              <TranparentInput
                register={register("1_3", { disabled: !token })}
              />
            </td>
          </tr>

          {/* Author */}
          <tr>
            <th colSpan={2} className="text-xl">
              2. Author
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              <TranparentInput register={register("2", { disabled: !token })} />
            </td>
          </tr>

          {/* Title */}
          <tr>
            <th rowSpan={3} className="w-[150px] text-xl">
              3. Title
            </th>
            <th className="w-[200px] text-xl">3.1. Title</th>
            <td colSpan={3} className="p-0 relative h-14 text-xl">
              <TranparentInput
                register={register("3_1", { disabled: !token })}
              />
            </td>
          </tr>
          <tr>
            <th className="text-xl">3.2. Title as in manuscript</th>
            <td className="p-0 relative h-14">
              <TranparentInput
                register={register("3_2", { disabled: !token })}
              />
            </td>
          </tr>
          <tr>
            <th className="text-xl">3.3. Known also as</th>
            <td className="p-0 relative h-14">
              <TranparentInput
                register={register("3_3", { disabled: !token })}
              />
            </td>
          </tr>

          {/* Date of Writing */}
          <tr>
            <th colSpan={2} className="text-xl">
              4. Date of writing
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              <TranparentInput register={register("4", { disabled: !token })} />
            </td>
          </tr>

          {/* Language */}
          <tr>
            <th colSpan={2} className="text-xl">
              5. Language
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              <TranparentInput register={register("5", { disabled: !token })} />
            </td>
          </tr>

          {/* Subject */}
          <tr>
            <th colSpan={2} className="text-xl">
              6. Subject
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              <TranparentInput register={register("6", { disabled: !token })} />
            </td>
          </tr>

          {/* Quantity of Sheets */}
          <tr>
            <th rowSpan={2} className="w-[150px] text-xl">
              7. Quantity of sheets
            </th>
            <th className="w-[200px] text-xl">7.1. Quantity of sheets</th>
            <td colSpan={3} className="p-0 relative h-14 text-xl">
              <TranparentInput
                register={register("7_1", { disabled: !token })}
              />
            </td>
          </tr>
          <tr>
            <th className="text-xl">7.2. Available illustration</th>
            <td className="p-0 relative h-14">
              <TranparentInput
                register={register("7_2", { disabled: !token })}
              />
            </td>
          </tr>

          {/* Copyist */}
          <tr>
            <th colSpan={2} className="text-xl">
              8. Copyist
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              <TranparentInput register={register("8", { disabled: !token })} />
            </td>
          </tr>

          {/* Date, Place of Copying */}
          <tr>
            <th rowSpan={2} className="w-[150px] text-xl">
              9. Date, Place of Copying
            </th>
            <th className="w-[200px] text-xl">9.1. Date of Copying</th>
            <td colSpan={3} className="p-0 relative h-14 text-xl">
              <TranparentInput
                register={register("9_1", { disabled: !token })}
              />
            </td>
          </tr>
          <tr>
            <th className="text-xl">9.2. Place of Copying</th>
            <td className="p-0 relative h-14">
              <TranparentInput
                register={register("9_2", { disabled: !token })}
              />
            </td>
          </tr>

          {/* Handwriting Kind */}
          <tr>
            <th colSpan={2} className="text-xl">
              10. Handwriting kind
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              <TranparentInput
                register={register("10", { disabled: !token })}
              />
            </td>
          </tr>

          {/* Defects */}
          <tr>
            <th colSpan={2} className="text-xl">
              11. Defects
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              <TranparentInput
                register={register("11", { disabled: !token })}
              />
            </td>
          </tr>

          {/* Note */}
          <tr className="h-32">
            <th colSpan={2} className="text-xl">
              12. Note
            </th>
            <td colSpan={3} className="p-0 relative h-14">
              {isEditing ? (
                <>
                  <textarea
                    className="absolute inset-0 py-1 px-2 bg-transparent resize-none outline-none h-full w-full"
                    {...register("12", { disabled: !token })}
                    value={note}
                    onChange={handleChange}
                  />
                  {!!token && (
                    <button
                      type="button"
                      onClick={handleSave}
                      className="absolute right-2 top-2 bg-blue-500 text-white p-2 rounded"
                    >
                      <img src="/assets/icons/save.svg" alt="" />
                    </button>
                  )}
                </>
              ) : (
                <>
                  {renderNote}

                  {!!token && (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="absolute right-2 top-2 bg-blue-500 text-white p-2 rounded"
                    >
                      <img src="/assets/icons/edit.svg" alt="" />
                    </button>
                  )}
                </>
              )}
            </td>
          </tr>

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
