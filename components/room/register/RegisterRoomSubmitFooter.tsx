import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";


import styled from "styled-components";
import palette from "../../../styles/palette";

import { useSelector } from "../../../store";
import { registerRoomAPI } from "../../../lib/api/room";

import Button from "../../common/Button";

import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

const RegisterRoomSubmitFooter: React.FC<IProps> = () => {
  const router = useRouter();

  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);

  const onClickRegisterRoom = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
    };

    try{
      await registerRoomAPI(registerRoomBody);
      router.push("/");
    } catch(e){
      console.log(e);
    }
  };

  return (
    <Container>
      <Link href="/room/register/date">
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button width="102px" color="bittersweet" onClick={onClickRegisterRoom}>
        등록하기
      </Button>
    </Container>
  );
};

export default RegisterRoomSubmitFooter;
