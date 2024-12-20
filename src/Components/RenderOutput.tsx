import React, { useEffect, useState } from "react";
import { RenderOutputProps } from "./Interface";
import { debounce, getId } from "../Utils";
import { convertMarkUpTextApi } from "../Api/convertMarkUpText";
import DOMPurify from "dompurify";
import { validateTags } from "../Utils";
import { v4 as uuidv4 } from "uuid";

const RenderOutput: React.FC<RenderOutputProps> = ({ markdownText }) => {
  const id = uuidv4();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [error, setError] = useState<string[]>([]);

  const debouncedProcessMarkdown = debounce(async (markdown: string) => {
    const validation = validateTags(markdown);
    if (validation.length > 0) {
      setError(validation);
      setHtmlContent("");
      return;
    } else {
      const renderHTML = await convertMarkUpTextApi(markdown);
      setHtmlContent(renderHTML);
    }
  }, 1000);

  useEffect(() => {
    if (markdownText) {
      debouncedProcessMarkdown(markdownText);
    } else {
      setHtmlContent("");
      setError([]);
    }
    if (!getId()) sessionStorage.setItem("sessionId", id);

    return () => {
      debouncedProcessMarkdown.cancel();
      setHtmlContent("");
      setError([]);
    };
  }, [markdownText]);

  return (
    <div className="RenderOutput">
      {Array.isArray(error) && error.length > 0 ? (
        error.map((data, index) => {
          return (
            <p key={index} className="error">
              {data}
            </p>
          );
        })
      ) : (
        <React.Fragment>
          {!htmlContent ? (
            <p className="label">View Output</p>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
              }}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default RenderOutput;
