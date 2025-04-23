import Loading from "src/components/Loader";
import RichTextEditor from "src/components/RichTextEditor";
import { getTelegraph } from "src/hooks/useTelegraph";

const AddHugeText = () => {
  const { data, isLoading } = getTelegraph({ id: 1 });
  if (isLoading) return <Loading />;

  return (
    <div>
      <RichTextEditor defaultValue={data?.body || ""} />
    </div>
  );
};

export default AddHugeText;
