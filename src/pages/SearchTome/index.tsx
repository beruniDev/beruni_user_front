import { useForm } from "react-hook-form";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Title from "src/components/Title";

const SearchTome = () => {
  const { register } = useForm();
  return (
    <div className="flex flex-1 flex-col p-1">
      <Title title="Search by tome" />
      <div className="mt-10 flex gap-4">
        <BaseInput className="flex flex-1">
          <MainInput register={register("search")} />
        </BaseInput>

        <Button className="bg-gray-300">Search</Button>
      </div>
    </div>
  );
};

export default SearchTome;
