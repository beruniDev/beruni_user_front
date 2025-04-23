import React from "react";
import DOMPurify from "dompurify";

interface DisplayFormattedTextProps {
  content: string;
}

const DisplayFormattedText: React.FC<DisplayFormattedTextProps> = ({
  content,
}) => {
  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return <div dangerouslySetInnerHTML={createMarkup(content)} />;
};

export default DisplayFormattedText;
