import { ChangeEvent, useState, KeyboardEvent, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BaseInput from "src/components/BaseInputs";
import MainInput from "src/components/BaseInputs/MainInput";
import Button from "src/components/Button";
import EmptyList from "src/components/EmptyList";
import ItemsCount from "src/components/ItemsCount";
import Loading from "src/components/Loader";
import Pagination from "src/components/Pagination";
import SearchItem from "src/components/SearchItem";
import Title from "src/components/Title";
import useBookSearch from "src/hooks/useBookSearch";

const Search = () => {
  const [text, $text] = useState<string>();

  const {
    data: books,
    isLoading,
    refetch,
    isFetching,
  } = useBookSearch({ enabled: false, text: text! });

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
      <Title title="Search" />

      <div className="mt-10 flex gap-4 md:flex-row flex-col">
        <BaseInput className="flex flex-1">
          <MainInput
            placeholder={"Search..."}
            name="main_search"
            onChange={handleChange}
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

export default Search;
