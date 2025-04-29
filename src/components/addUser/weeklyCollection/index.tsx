import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { Button, Input, message, Select, Upload } from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Container } from "./styles";
import { useBorrowerAPI } from "../../../Api/borrowerApi";

const validationSchema = Yup.object({
  profilePic: Yup.string().required("Profile picture is required"),
  name: Yup.string().required("Name is required"),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be exactly 10 digits"),
  gender: Yup.string().required("Gender is required"),
  oldAccountNumber: Yup.string(),
  address: Yup.string().required("Address is required"),
  landMark: Yup.string().required("Land Mark is required"),
  loadAmount: Yup.number()
    .required("Load Amount is required")
    .positive("Load Amount must be positive"),
  pinCode: Yup.string()
    .required("Pin Code is required")
    .matches(/^[0-9]{6}$/, "Pin Code must be exactly 6 digits"),
  refName: Yup.string(),
  refAccNo: Yup.string(),
  refMobileNo: Yup.string().matches(
    /^[0-9]{10}$/,
    "Ref Mobile Number must be exactly 10 digits"
  ),
});

interface DailyCollectionProps {
  close: () => void;
}

const WeeklyCollection: React.FC<DailyCollectionProps> = ({ close }) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { addNewBorrower } = useBorrowerAPI();

  const handleUpload = (file: any, setFieldValue: any) => {
    if (!file) {
      console.error("No file provided.");
      return false;
    }

    const convertToBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });

    convertToBase64(file.originFileObj || file)
      .then((base64) => {
        setProfilePic(base64);
        setFieldValue("profilePic", base64);
      })
      .catch((error) => {
        console.error("Error converting file to base64: ", error);
      });

    return false;
  };

  const handleSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(1);
    const saveBorrower = await addNewBorrower(values);
    console.log(saveBorrower);
    if (saveBorrower.saved) {
      message.success("Borrower added successfully");
      resetForm();
      setProfilePic(null);
    } else if (saveBorrower.exists) {
      message.info(
        <div>
          <em> Borrower already exists</em> <br />
          <em>Name: {saveBorrower.data.name}</em> <br />
          <em>Mobile Number: {saveBorrower.data.mobileNumber}</em>
        </div>
      );
    } else {
      message.error("Failed to add borrower");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          profilePic: "",
          name: "",
          mobileNumber: "",
          gender: "",
          oldAccountNumber: "",
          address: "",
          landMark: "",
          loadAmount: "",
          pinCode: "",
          refName: "",
          refAccNo: "",
          refMobileNo: "",
          borrowerType: "WEEKLY",
          fieldId: "7",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm, setFieldValue, values }) => (
          <Container>
            <Form>
              <span className="heading"> Weekly Collection</span>
              <div className="profileContainer">
                {profilePic ? (
                  <div className="profile-pic-container">
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="profile-pic"
                      onClick={() => setProfilePic(null)}
                    />
                  </div>
                ) : (
                  <Field name="profilePic">
                    {() => (
                      <Upload
                        listType="picture"
                        showUploadList={false}
                        customRequest={({ file }: any) =>
                          handleUpload(file, setFieldValue)
                        }
                        accept="image/*"
                      >
                        <div className="profileCircle">
                          Upload <br /> Photo
                        </div>
                      </Upload>
                    )}
                  </Field>
                )}
                <ErrorMessage
                  name="profilePic"
                  component="div"
                  className="error"
                />
              </div>
              <div className="sub-heading">
                <span>Borrower Details</span>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <Field name="name">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Name" />
                    )}
                  </Field>
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div className="form-field">
                  <Field name="mobileNumber">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        placeholder="Mobile Number"
                        type="number"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-field">
                  <Field name="gender">
                    {({ field }: any) => (
                      <Select
                        {...field}
                        value={values.gender}
                        style={{ width: "100%", color: "red" }}
                        onChange={(value) => setFieldValue("gender", value)}
                        options={[
                          { value: "", label: "Select Gender", disabled: true },
                          { value: "1", label: "Male" },
                          { value: "2", label: "Female" },
                          { value: "0", label: "Others" },
                        ]}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-field">
                  <Field name="oldAccountNumber">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        placeholder="Old Account Number"
                        type="number"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="oldAccountNumber"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <Field name="address">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Address" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>

                {/* <div className="form-field">
                <Field name="city">
                  {({ field }: any) => <Input {...field} placeholder="City" />}
                </Field>
                <ErrorMessage name="city" component="div" className="error" />
              </div> */}

                <div className="form-field">
                  <Field name="landMark">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Land Mark" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="landMark"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-field">
                  <Field name="loadAmount">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        placeholder="Load Amount"
                        type="number"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="loadAmount"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-field">
                  <Field name="pinCode">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Pin Code" type="number" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="pinCode"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="sub-heading">
                <span>Reference Details</span>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <Field name="refName">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Ref Name" type="refName" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="refName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-field">
                  <Field name="refAccNo">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        placeholder="Ref Account Number"
                        type="number"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="refName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-field">
                  <Field name="refMobileNo">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        placeholder="Ref Mobile Number"
                        type="number"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="refMobileNo"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-field"></div>
              </div>

              <div className="groupBtn">
                <Button
                  style={{
                    background: "linear-gradient(to right, #0A5EB0, #577BC1)",
                  }}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<SaveOutlined />}
                >
                  Submit
                </Button>
                <Button
                  style={{
                    background: "linear-gradient(to right, #ED2B2A, #F24C3D)",
                  }}
                  type="primary"
                  size="large"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => {
                    resetForm();
                    close();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default WeeklyCollection;
