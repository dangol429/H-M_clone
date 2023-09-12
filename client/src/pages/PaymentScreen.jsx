import React, { useState } from "react";
import styled from "styled-components";

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PaymentHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: blue;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const OrderSummaryContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Summary = styled.div`
  border-radius: 10px;
  padding: 20px;
  background-color: #ffffff;
`;

const SummaryTitle = styled.h3`
  font-weight: 200;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
  };

  const totalPrice = 100; // Replace with your actual total price

  return (
    <PaymentContainer>
      <PaymentHeader>Payment Details</PaymentHeader>
      <PaymentForm onSubmit={handleSubmit}>
        <FormField>
          <Label>Card Number</Label>
          <Input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>Expiry Date</Label>
          <Input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>CVV</Label>
          <Input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </FormField>
        <Button type="submit">Pay Now</Button>
      </PaymentForm>
      <OrderSummaryContainer>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>$ 40</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping Discount</SummaryItemText>
            <SummaryItemPrice>$ -40</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
          </SummaryItem>
        </Summary>
      </OrderSummaryContainer>
    </PaymentContainer>
  );
};

export default PaymentScreen;
