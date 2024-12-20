import React from "react";
import { MarkdownInputProps } from "./Interface";

const MarkdownInput: React.FC<MarkdownInputProps> = ({ setMarkdownText }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    setMarkdownText(inputValue);
  };

  return (
    <div className="MarkdownInput">
      <textarea placeholder="Type your MetaText here" onChange={handleChange} />
    </div>
  );
};

export default MarkdownInput;
