import React from "react";
import { styled } from "styled-components";

const AddressSectionContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #eaeaec;
  margin-bottom: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: black;
  &.vibrate {
    animation: vibrateAnimation 0.3s infinite linear;
    background-color: black;
    color: white;
  }

  @keyframes vibrateAnimation {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
const AddressTitle = styled.div`
  font-size: 14px;
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
`;
const AddressName = styled.div`
  width: 100%;
  display: flex;
  white-space: pre;
  color: inherit;
  font-weight: 700;
`;
const AddressSubText = styled.div`
  font-size: 12px;
  line-height: 15px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  font-weight: 600;
  color: inherit;
`;
const AddressChangeBtn = styled.button`
  font-size: 12px;
  line-height: inherit;
  outline: none;
  color: inherit;
`;
const AddressStripComponent = ({
  setOpenAddressDialog,
  address,
  intrectable = true,
  addClass,
}) => {
  return (
    <AddressSectionContainer className={addClass}>
      <AddressTitle>
        <AddressName>
          Deliver To :<span>{address?.address?.Name}</span>
          <span>, {address?.address?.PinCode}</span>
        </AddressName>
        <AddressSubText>{address?.address?.FullAddress}</AddressSubText>
      </AddressTitle>
      {intrectable && (
        <AddressChangeBtn
          role="button"
          onClick={() => {
            setOpenAddressDialog(true);
          }}
        >
          <span>Change Address</span>
        </AddressChangeBtn>
      )}
    </AddressSectionContainer>
  );
};

export default AddressStripComponent;
