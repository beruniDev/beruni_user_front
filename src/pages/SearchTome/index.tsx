import { useForm } from "react-hook-form";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Title from "src/components/Title";

const SearchTome = () => {
  const { register } = useForm();
  return (
    <div className="flex flex-1 flex-col p-1 withBg">
      <Title title="Search by country" />

      <div className="mt-10 flex gap-4 md:flex-row flex-col">
        <BaseInput className="flex flex-1">
          <MainInput register={register("search")} />
        </BaseInput>

        <Button className="w-full md:w-52">Search</Button>
      </div>
    </div>
  );
};

export default SearchTome;
