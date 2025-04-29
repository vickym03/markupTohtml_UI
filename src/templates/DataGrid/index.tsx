import { Button, Modal, Collapse, Input, message } from "antd";
import React, { useState } from "react";
import { Container } from "./styles";
import moment from "moment";
import { SaveOutlined } from "@ant-design/icons";
import { useBorrowerAPI } from "../../Api/borrowerApi";
const { Panel } = Collapse;

interface DataGridCustomProps {
  data: any;
  fetchData: () => void;
  update: boolean;
}

const DataGridCustom: React.FC<DataGridCustomProps> = ({
  data,
  fetchData,
  update,
}) => {
  const { upadateBorrower } = useBorrowerAPI();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [value, setValue] = useState("");

  const showModal = (item: any) => {
    setModalData(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    console.log(inputValue);

    if (
      /^\d*$/.test(inputValue) &&
      (inputValue === "" || parseInt(inputValue, 10) <= modalData.balanceAmount)
    ) {
      setValue(inputValue);
    } else {
      setValue("");
      message.info(
        `Please enter a valid amount. Balance amount is ${modalData.balanceAmount}`
      );
    }
  };

  const handleSaveCollection = async (id: string) => {
    if (value === "") {
      message.info("Please enter a number");
      return;
    }

    const inputValue = parseInt(value, 10);

    if (isNaN(inputValue) || inputValue > modalData.balanceAmount) {
      message.info(
        `Please enter a valid number balance amount ${modalData.balanceAmount}`
      );
      return;
    }
    const update = await upadateBorrower(id, Number(value));
    if (update.update) {
      message.success(` ${value} Added successfully!`);
      fetchData();
      handleCancel();
      setValue("");
    } else {
      message.error(` ${value} failed to add `);
    }
  };

  return (
    <Container>
      <div className="header">
        <span>#</span>
        <span>Name</span>
        <span>Mobile Number</span>
        <span>Status</span>
        <span>Total Amount</span>
        <span>Balance Amount</span>
        <span>Actions</span>
      </div>
      {data.map((items: any, index: number) => (
        <div key={index} className="row">
          <span>{index + 1}</span>
          <span>{items.name}</span>
          <span>{items.mobileNumber}</span>
          <span
            style={{
              border:
                items.totalAmount === items.amountPaid &&
                items.balanceAmount === 0
                  ? "1px solid #118B50"
                  : "1px solid #F95454",
              color: "white",
              backgroundColor:
                items.totalAmount === items.amountPaid &&
                items.balanceAmount === 0
                  ? " #118B50"
                  : " #F95454",
              padding: "5px 0px",
              borderRadius: "10px",
            }}
          >
            {items.totalAmount === items.amountPaid && items.balanceAmount === 0
              ? "Cleared"
              : "Pending"}
          </span>
          <span>{items.totalAmount}</span>

          <span>{items.balanceAmount}</span>
          <Button
            style={{
              // background: "#074173",
              border: "1px solid #074173",
              color: "#074173",
            }}
            onClick={() => showModal(items)}
          >
            View
          </Button>
        </div>
      ))}

      <Modal
        title="Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {modalData && (
          <Collapse accordion>
            <Panel header="Personal Details" key="1">
              <div>
                <img
                  src={modalData.profilePic}
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                />
                <br />
                <span>Name: {modalData.name}</span>
                <br />
                <span>Address: {modalData.address}</span>
                <br />
                <span>
                  Gender: {modalData.gender === 1 ? "Male" : "Female"}
                </span>
                <br />
                <span>Mobile Number: {modalData.mobileNumber}</span>
                <br />
                <span>City: {modalData.city}</span>
                <br />
                <span>Pin Code: {modalData.pinCode}</span>
                <br />
                <span>Landmark: {modalData.landMark}</span>
              </div>
            </Panel>
            <Panel header="Account Details" key="2">
              <div>
                <span>Old Account Number: {modalData.oldAccountNumber}</span>
                <br />
                <span>Load Amount: {modalData.loadAmount}</span>
                <br />
                <span>Total Amount: {modalData.totalAmount}</span>
                <br />
                <span>Balance Amount: {modalData.balanceAmount}</span>
                <br />
                <span>Amount Paid: {modalData.amountPaid}</span>
              </div>
            </Panel>

            <Panel header="Reference Details" key="4">
              <div>
                <span>Reference Name: {modalData.refName}</span>
                <br />
                <span>Reference Account Number: {modalData.refAccNo}</span>
                <br />
                <span>Reference Mobile Number: {modalData.refMobileNo}</span>
              </div>
            </Panel>
            <Panel header="Financial Details" key="5">
              <div>
                <span>Interest: {modalData.intrest}</span>
                <br />
                <span>In Rupees: {modalData.inRupees}</span>
                <br />
                <span>Borrower Type: {modalData.borrowerType}</span>
                <br />

                <span>
                  Amount Settled:{" "}
                  {modalData.amountSettled &&
                  modalData.amountSettled.length > 0 ? (
                    <Container>
                      <div className="header">
                        <span>#</span>
                        <span>Amount</span>
                        <span>Date</span>
                      </div>
                      <div>
                        {modalData.amountSettled.map(
                          (items: any, index: number) => (
                            <div key={index} className="row">
                              <span>{index + 1}</span>
                              <span>{items.amount}</span>
                              <span>
                                {" "}
                                {moment(items.date).format("DD-MM-YYYY HH:mm")}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </Container>
                  ) : (
                    "None"
                  )}
                </span>
              </div>
            </Panel>
            {update && (
              <Panel header="Update Collection" key="6">
                <div style={{ display: "flex", gap: "10px" }}>
                  <Input
                    disabled={
                      modalData.totalAmount === modalData.amountPaid &&
                      modalData.balanceAmount === 0
                    }
                    value={value}
                    onChange={handleInputChange}
                    placeholder={`Enter a number balance amount ${modalData.balanceAmount}`}
                  />
                  <Button
                    disabled={
                      modalData.totalAmount === modalData.amountPaid &&
                      modalData.balanceAmount === 0
                    }
                    icon={<SaveOutlined />}
                    style={{
                      background: "linear-gradient(to right, #B03052, #D76C82)",
                      border: "none",
                      color: "white",
                    }}
                    onClick={() => handleSaveCollection(modalData._id)}
                  >
                    Submit
                  </Button>
                </div>
              </Panel>
            )}
          </Collapse>
        )}
      </Modal>
    </Container>
  );
};

export default DataGridCustom;
