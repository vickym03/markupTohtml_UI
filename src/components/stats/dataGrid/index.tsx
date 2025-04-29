import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Container } from "./styles";
import DataGridCustom from "../../../templates/DataGrid";

interface DailyCollectionProps {
  close: () => void;
  heading: string;
  data: any;
}
const DataGrid: React.FC<DailyCollectionProps> = ({ close, heading, data }) => {
  return (
    <Container>
      <div className="heading">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          size="large"
          onClick={close}
        />
        <p> {heading}</p>
        <p></p>
      </div>

      <DataGridCustom data={data} fetchData={() => {}} update={false} />
    </Container>
  );
};

export default DataGrid;
