import React, { useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethod";

const ModalWrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;ss
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 5px auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
`;

const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddressDialogBox = ({
  setOpenAddressDialog,
  setOnAddressChange,
  onAddressChange,
}) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const addAddress = async (data) => {
    try {
      await userRequest.post("address/add", data);

      setOnAddressChange(onAddressChange + 1);
    } catch (err) {
      console.log(`AllProductSection ${err}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addressObject = {
      Name: name,
      MobileNumber: mobile,
      PinCode: pinCode,
      FullAddress: `${houseNo},${streetNumber},${town},${district},${city}`,
    };

    addAddress(addressObject);
    // Clear the form fields
    setName("");
    setMobile("");
    setPinCode("");
    setStreetNumber("");
    setHouseNo("");
    setTown("");
    setCity("");
    setDistrict("");
    setOpenAddressDialog(false);
  };

  return (
    <>
      <ModalWrapper>
        <ModalContent>
          <AddressForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name:</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Mobile No:</Label>
              <Input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Pin Code:</Label>
              <Input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Street Number:</Label>
              <Input
                type="text"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>House No:</Label>
              <Input
                type="text"
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Town:</Label>
              <Input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>City:</Label>
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>District:</Label>
              <Input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </AddressForm>
          <Button
            onClick={() => {
              setOpenAddressDialog(false);
            }}
          >
            Close
          </Button>
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default AddressDialogBox;
