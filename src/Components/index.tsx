import React, { useState } from "react";
import Container from "./Styles";
import RenderOutput from "./RenderOutput";
import MarkdownInput from "./MarkdownInput";

const MainScreen = () => {
  const [markdownText, setMarkdownText] = useState("");

  return (
    <Container>
      <MarkdownInput setMarkdownText={setMarkdownText} />
      <RenderOutput markdownText={markdownText} />
    </Container>
  );
};

export default MainScreen;
