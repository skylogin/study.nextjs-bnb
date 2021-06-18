import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import palette from "../../../styles/palette";

import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";

import DatePicker from "../../common/DatePicker";

import RegisterRoomFooter from "./RegisterRoomFooter";


const Container = styled.div`
  padding: 62px 30px 100px;
  h2{
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3{
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  
`;

const RegisterRoomDate: React.FC = () => {
  const dispatch = useDispatch();

  const price = useSelector((state) => state.registerRoom.price);

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const numberPrice = Number(input.replace(/,/g, ""));
    if(!numberPrice || numberPrice === 0){
      dispatch(registerRoomActions.setPrice(0));
    }

    if(numberPrice !== 0){
      dispatch(registerRoomActions.setPrice(numberPrice));
    }
  }

  return (
    <Container>
      <h2>예약 가능 여부 설정.</h2>
      <h3>11단계</h3>

      <DatePicker onChange={(date) => console.log(date)} />

      <RegisterRoomFooter
        prevHref="/room/register/price"
        nextHref="/room/register/"
      />
    </Container>
  );
};

export default RegisterRoomDate;