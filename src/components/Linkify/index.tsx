import React from "react";

interface LinkifyProps {
  text: string;
  className?: string;
}

// Regular expression for matching URLs (including http, https)
const urlRegex = /(https?:\/\/[^\s]+)/gi;

const Linkify: React.FC<LinkifyProps> = ({ text, className }) => {
  const parts = text?.split(urlRegex);

  return (
    <p className={className}>
      {parts?.map((part, index) =>
        urlRegex?.test(part) ? (
          <a
            className="text-blue-400"
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </p>
  );
};

export default Linkify;
