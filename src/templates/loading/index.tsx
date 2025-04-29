import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Container } from "./styles";

function useLoading() {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);

  const endLoading = () => setLoading(false);

  const Loading = () => {
    return (
      <React.Fragment>
        {loading && (
          <Container className="loading">
            <Spin indicator={<LoadingOutlined spin className="spin" />} />
          </Container>
        )}
      </React.Fragment>
    );
  };

  return {
    Loading,
    startLoading,
    endLoading,
  };
}
export default useLoading;
