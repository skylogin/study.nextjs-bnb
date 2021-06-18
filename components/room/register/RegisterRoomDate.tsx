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

  const startDate = useSelector((state) => state.registerRoom.startDate);

  const onChangeStartDate= (date: Date | null) => {
    console.log(date);
    dispatch(registerRoomActions.setStartDate(date? date.toISOString(): null));
  }

  return (
    <Container>
      <h2>예약 가능 여부 설정.</h2>
      <h3>11단계</h3>

      <DatePicker 
        selected={startDate? new Date(startDate): null}
        onChange={onChangeStartDate} 
      />

      <RegisterRoomFooter
        prevHref="/room/register/price"
        nextHref="/room/register/"
      />
    </Container>
  );
};

export default RegisterRoomDate;