import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Title from "src/components/Title";
import { tokenSelector } from "src/store/reducers/auth";
import { filterHandler, filterSelector } from "src/store/reducers/filter";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { bookValues } from "src/utils/helpers";

const DetailedSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filter = useAppSelector(filterSelector);
  const token = useAppSelector(tokenSelector);
  const { register, handleSubmit, reset, getValues, setValue } = useForm();

  const onSubmit = () => {
    const values = Object.entries(getValues()).reduce((acc: any, item) => {
      if (!!item[1]) acc[item[0]] = item[1];
      return acc;
    }, {});
    dispatch(filterHandler(values as typeof bookValues));
    navigate("/list");
  };

  const handleReset = () => {
    dispatch(filterHandler(undefined));
    Object.keys(getValues()).forEach((item) => setValue(item, ""));
  };

  useEffect(() => {
    reset(filter);
  }, []);

  return (
    <div className="flex flex-1 flex-col p-1 withBg z-10">
      <Title title={!token ? "Detailed search" : "Filter"} />
      <form className="z-10 p-4 max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 flex-[7]">
          <div className="border-r-2 md:flex-[2] font-bold border-r-mainBrown pr-4 flex h-[44px] items-center w-[100px]">
            Country:
          </div>
          <div className="w-full flex flex-[5] p-1">
            <MainInput
              className="!mb-0"
              register={register("inventory_number")}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-[7] ">
          <div className="border-r-2 border-r-mainBrown font-bold md:flex-[2] w-[100px] pr-4 flex h-[44px] items-center">
            Title:
          </div>
          <div className="max-w-lg w-full flex p-1 flex-[5]">
            <MainInput
              className="!mb-0"
              autoComplete="name_title"
              register={register("title")}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-[7]">
          <div className="border-r-2 border-r-mainBrown font-bold md:flex-[2] w-[100px] pr-4 flex h-[44px] items-center">
            Author name:
          </div>
          <div className="max-w-lg w-full flex p-1 flex-[5]">
            <MainInput className="!mb-0" register={register("author")} />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-[7]">
          <div className="border-r-2 border-r-mainBrown font-bold md:flex-[2] w-[100px] pr-4 flex h-[44px] items-center">
            Language:
          </div>
          <div className="max-w-lg w-full flex p-1 flex-[5]">
            <MainInput className="!mb-0" register={register("language")} />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-[7]">
          <div className="border-r-2 border-r-mainBrown font-bold md:flex-[2] w-[100px] pr-4 flex h-[44px] items-center">
            Subject:
          </div>
          <div className="max-w-lg w-full flex p-1 flex-[5]">
            <MainInput className="!mb-0" register={register("subjects")} />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-[7]">
          <div className="border-r-2 border-r-mainBrown font-bold md:flex-[2] w-[100px] pr-4 flex h-[44px] items-center">
            Illustartion:
          </div>
          <div className="max-w-lg w-full flex p-1 flex-[5]">
            <MainInput className="!mb-0" register={register("quantity_ill")} />
          </div>
        </div>
        <div className="mt-6 flex gap-4 flex-[7]">
          <div className="flex-[2]" />
          <div className="flex flex-[5] gap-3 md:flex-row flex-col">
            <Button type="submit">Search</Button>
            <Button
              onClick={handleReset}
              className="bg-blue-600 text-white z-20 relative"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailedSearch;
