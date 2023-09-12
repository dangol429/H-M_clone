import React from "react";
import styled from "styled-components";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

const ReviewsContainer = styled.div`
  margin-top: 22px;
`;


const Star = styled(TiStarFullOutline)`
  margin: 0px 2px;
  color: black;
  font-size: 20px;
`;

const EmptyStar = styled(TiStarOutline)`
  margin: 0px 2px;
  color: black;
  font-size: 20px;
`;

const CustomerReview = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ReviewAuthor = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ReviewDate = styled.span`
  font-size: 14px;
  color: #777;
`;

const ReviewText = styled.p`
  font-size: 14px;
  margin-bottom: 0;
`;
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CustomerReviewsComponent = ({ data }) => {
    const renderStars = () => {
      const stars = [];
  
      for (let i = 1; i <= 5; i++) {
        if (i <= data.rating) {
          stars.push(<Star key={i} />);
        } else {
          stars.push(<EmptyStar key={i} />);
        }
      }
  
      return stars;
    };
  
    return (
      <ReviewsContainer>
        <CustomerReview>
          <ReviewHeader>
            <ReviewAuthor>{data.customerName}</ReviewAuthor>
            <ReviewDate>{formatDate(data.createdAt)}</ReviewDate>
          </ReviewHeader>
          <ReviewRating>{renderStars()}</ReviewRating>
          <ReviewText>{data.review}</ReviewText>
        </CustomerReview>
      </ReviewsContainer>
    );
  };
  

export default CustomerReviewsComponent;
