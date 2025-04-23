import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import Button from "../Button";
import { editTelegraph } from "src/hooks/useTelegraph";
import { errorToast, successToast } from "src/utils/toast";
import Loading from "../Loader";

interface Props {
  defaultValue: string;
}

const RichTextEditorWithDynamicIDs: React.FC<Props> = ({ defaultValue }) => {
  const [content, setContent] = useState<string>(defaultValue);
  const [processedContent, setProcessedContent] = useState<string>("");

  const { mutate, isPending } = editTelegraph();

  const handleSubmit = () => {
    mutate(
      { id: 1, body: content, name: "Main Telegraph Text", status: 1 },
      {
        onSuccess: () => {
          successToast("success");
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  const handleChange = (html: string) => {
    setContent(html);
  };

  useEffect(() => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(content, "text/html");
    const headings = htmlDoc.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading, index) => {
      // Generate a dynamic id based on content or index
      const dynamicId =
        heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || `heading-${index}`;

      heading.setAttribute("id", dynamicId);
    });

    const sanitizedHtml = DOMPurify.sanitize(htmlDoc.body.innerHTML);
    setProcessedContent(sanitizedHtml);
  }, [content]);

  return (
    <div className="p-4 relative">
      {isPending && <Loading />}
      <ReactQuill theme="snow" value={content} onChange={handleChange} />

      <div className="mt-8 border p-4 bg-gray-100 rounded text-">
        <h3 className="font-bold">Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>

      <div className="flex justify-end sticky self-end bottom-2 mt-4">
        <Button disabled={isPending} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RichTextEditorWithDynamicIDs;
