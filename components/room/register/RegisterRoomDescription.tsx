import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import palette from "../../../styles/palette";

import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";

import Button from "../../common/Button";

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
  .register-room-step-info{
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterRoomDescription: React.FC = () => {
  const dispatch = useDispatch();

  // const photos = useSelector((state) => state.registerRoom.photos);

  return (
    <Container>
      <h2>게스트에게 숙소에 대해 설명해주세요.</h2>
      <h3>8단계</h3>
      <p className="register-room-step-info">
        숙소의 장점, 특별한 편의시설(예: 빠른 와이파이 또는 주차시설)과 주변 지역의 매력을 소개해주세요.
      </p>

      <RegisterRoomFooter
        prevHref="/room/register/photo"
        nextHref="/room/register/description"
      />
    </Container>
  );
};

export default RegisterRoomDescription;