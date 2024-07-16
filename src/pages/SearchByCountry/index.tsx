import { ChangeEvent, KeyboardEvent, useState } from "react";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import Loading from "src/components/Loader";
import SearchItem from "src/components/SearchItem";
import Title from "src/components/Title";
import useBooks from "src/hooks/useBooks";

const SearchByCountry = () => {
  const [text, $text] = useState<string>();

  const {
    data: books,
    isLoading,
    refetch,
    isFetching,
  } = useBooks({ enabled: false, inventory_number: text! });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    $text(e.target.value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !!text) refetch();
  };

  const onSubmit = () => {
    if (!!text) refetch();
  };

  return (
    <div className="flex flex-1 flex-col p-1 withBg">
      <Title title="Search by country" />

      <div className="mt-10 flex gap-4 md:flex-row flex-col">
        <BaseInput className="flex flex-1">
          <MainInput
            placeholder={"Search by country..."}
            onChange={handleChange}
            name="search_by_country"
            onKeyDown={handleKeyDown}
          />
        </BaseInput>

        <Button className="w-full md:w-52" onClick={onSubmit}>
          Search
        </Button>
      </div>

      <SearchItem data={books} />

      {(isLoading || isFetching) && <Loading />}
    </div>
  );
};

export default SearchByCountry;
