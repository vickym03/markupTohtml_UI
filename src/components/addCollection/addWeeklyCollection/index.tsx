import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { Button, Input, Radio, message } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { useBorrowerAPI } from "../../../Api/borrowerApi";
import useLoading from "../../../templates/loading";
import DataGridCustom from "../../../templates/DataGrid";
interface AddWeeklyCollectionProps {
  close: () => void;
}

const AddWeeklyCollection: React.FC<AddWeeklyCollectionProps> = ({ close }) => {
  const { findBorrower } = useBorrowerAPI();
  const { Loading } = useLoading();
  const options = [
    { label: "Mobile No", value: "mobileNumber" },
    { label: "Account Number", value: "accountNumber" },
    { label: "Name", value: "name" },
  ];
  const [selectedOption, setSelectedOption] = useState("mobileNumber");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [foundData, setFoundData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  const validateInput = (value: string) => {
    setError("");
    if (
      selectedOption === "mobileNumber" ||
      selectedOption === "accountNumber"
    ) {
      if (!/^\d{10}$/.test(value)) {
        setError("Please enter a valid 10-digit number.");
        return false;
      }
    } else if (selectedOption === "name") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError("Please enter a valid name (letters and spaces only).");
        return false;
      }
    }
    return true;
  };
  const handleSearch = async () => {
    if (validateInput(inputValue)) {
      const result = await findBorrower(inputValue, selectedOption);
      setFoundData(result);
      if (result.length > 0) message.success("Data found successfully!");
      else message.info("Data not found");
    }
  };
  console.log("fetchAgain", fetchAgain);
  useEffect(() => {
    const f = async () => {
      const result = await findBorrower(inputValue, selectedOption);
      setFoundData(result);
    };
    if (fetchAgain) {
      f();
      setFetchAgain(false);
    }
  }, [fetchAgain]);
  return (
    <Container>
      <Loading />
      <div className="heading">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          size="large"
          onClick={close}
        />
        <p>Update Weekly Borrower</p>
        <p></p>
      </div>

      <div className="content">
        <div className="radiobtn">
          <Radio.Group
            options={options}
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setError("");
            }}
          />
        </div>
        <div className="inputField">
          <Input
            placeholder="Enter details"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => validateInput(inputValue)}
            type={selectedOption === "name" ? "text" : "number"}
          />
          <Button
            icon={<SearchOutlined />}
            style={{
              background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              border: "none",
              color: "white",
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        {error && <span className="error">{error}</span>}
      </div>

      {foundData.length > 0 && (
        <DataGridCustom
          data={foundData}
          fetchData={() => setFetchAgain(true)}
          update={true}
        />
      )}
    </Container>
  );
};

export default AddWeeklyCollection;
