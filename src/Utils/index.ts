export const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debouncedFunction = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunction as typeof debouncedFunction & { cancel: () => void };
};

export const getId = () => sessionStorage.getItem("sessionId");

export function validateTags(text: string): string[] {
  const errors: string[] = [];

  const addError = (message: string) => errors.push(message);

  switch (true) {
    case /[^a-zA-Z0-9\s\*\+\-\.\_\#\(\)\[\]\{\}\!\/\`\~\&\%\=\:;\"\,\.\'\-]/.test(
      text
    ):
      addError(
        "Text contains invalid characters that are not allowed in Markdown."
      );
      break;
  }

  switch (true) {
    case /(^|\n)(#{1,6})(?!\s).+/g.test(text):
      addError("Headings must start with # followed by a space and text.");
      break;
  }

  switch (true) {
    case !/(\*\*.+\*\*|__.+__|\*.+\*|_.+_)/g.test(text):
      addError("Text formatting (bold/italic) should use *, **, _, or __.");
      break;
  }

  switch (true) {
    case /(^|\n)(-|\+|\*)(?!\s).+/g.test(text):
      addError(
        "List items must start with -, +, or * followed by a space and text."
      );
      break;
  }

  switch (true) {
    case /(^|\n)\d+\.(?!\s).+/g.test(text):
      addError(
        "Ordered list items must start with a number followed by a period and a space."
      );
      break;
  }

  return errors;
}
