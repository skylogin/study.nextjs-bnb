import React, { useEffect } from "react";
import Link from "next/link";

import styled from "styled-components";
import palette from "../../../styles/palette";

import Button from "../../common/Button";

import useValidateMode from "../../../hooks/useValidateMode";

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

const RegisterRoomSubmitFooter: React.FC<IProps> = ({
  prevHref,
  nextHref,
  isValid = true,
}) => {
  const onClickRegisterRoom = async () => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {

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
