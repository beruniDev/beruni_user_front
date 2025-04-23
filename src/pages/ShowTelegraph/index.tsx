import Loading from "src/components/Loader";
import { getTelegraph } from "src/hooks/useTelegraph";

const ShowTelegraph = () => {
  const { isLoading, data } = getTelegraph({ id: 1 });

  if (isLoading) return <Loading />;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: data?.body || "" }} />
    </div>
  );
};

export default ShowTelegraph;
