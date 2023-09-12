import React, { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import Swal from "sweetalert2";
import { Button, Form, Image } from "react-bootstrap";
import ShoppingCart from "../Images/logo.png";
import LoadingBar from "../components/Loadings/LoadingBar";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 960px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  left: 40%;
  position: relative;
  transform: translate(-40%);
`;

const Left = styled.div`
  flex: 2;
  border-radius: 10px 0px 0px 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: larger;
  color: black;
`;

const Right = styled.div`
  flex: 2;
  border-radius: 0px 10px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CustomForm = styled(Form)`
  padding: 30px;
`;

const StyledFormControl = styled(Form.Control)`
  margin-top: 20px;
`;

const SubmitButton = styled(Button)`
  background-color: black;
  border: none;
  margin-top: 20px;
  width: 100px;
  height: 40px;
  &:hover {
    background-color: #068ddb;
  }
`;

const ShoppingImage = styled(Image)`
  object-fit: contain;
  margin-top: 20px;
  width: 50%;
`;
const LoginLink = styled.p`
  margin-top: 20px;
  text-align: left;
  font-weight: 500;
  & > span {
    color: #ff3f6c;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Signup = ({ handleToggle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (
      !formData.name &&
      !formData.email &&
      !formData.mobileNumber &&
      !formData.password &&
      !formData.confirmPassword
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required",
      });
    }
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
      });
    }
    setLoading(true);
    try {
      const res = await publicRequest.post("/user/signup", formData);
      console.log(res);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });
      handleToggle();
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error,
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Wrapper>
      <Left>
      <h1>Join Us</h1>
        <ShoppingImage src={ShoppingCart} fluid />
      </Left>
      <Right>
        <CustomForm onSubmit={handleSignup}>
          <h2 style={{ fontSize: "40px", fontWeight: "700" }}>Register</h2>
          <StyledFormControl
            type="text"
            placeholder="Full Name"
            id="fullName"
            name="fullName"
            onChange={handleChange}
          />
          <StyledFormControl
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            onChange={handleChange}
          />
          <StyledFormControl
            type="Number"
            placeholder="Mobile Number"
            id="mobileNumber"
            name="mobileNumber"
            onChange={handleChange}
          />
          <StyledFormControl
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={handleChange}
          />
          <StyledFormControl
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
          />
          <SubmitButton variant="dark" type="submit">
            {loading ? <LoadingBar /> : "Register"}
          </SubmitButton>
          <LoginLink>
            Already have an account? <span onClick={handleToggle}>Login</span>
          </LoginLink>
        </CustomForm>
      </Right>
    </Wrapper>
  );
};

export default Signup;
