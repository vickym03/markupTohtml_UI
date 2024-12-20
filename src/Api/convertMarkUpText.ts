import axios from "axios";
import { getId } from "../Utils";

export const convertMarkUpTextApi = async (markdown: string) => {
  const url = "API/convertMarkUpText";
  const data = {
    markdownContent: markdown,
    uniqueId: getId(),
  };
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.response;
  } catch (error) {
    console.error("Error saving markdown:", error);
  }
};
