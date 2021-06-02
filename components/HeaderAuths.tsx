import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import palette from "../styles/palette";

import useModal from "../hooks/useModal";
import AuthModal from "./auth/AuthModal";

import { authActions } from "../store/auth";



const Container = styled.div`
    .header-sign-up-button{
        height:42px;
        margin-right: 8px;
        padding: 0 16px;
        border: 0;
        border-radius: 21px;
        background-color: white;
        cursor: pointer;
        outline: none;
        &:hover {
            background-color: ${palette.gray_f7}
        }
    }
    .header-login-button{
        height:42px;
        padding: 0 16px;
        border: 0;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
        border-radius: 21px;
        background-color: white;
        cursor: porinter;
        outline: none;
        &:hover {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        }
    }
`;

const HeaderAuths: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  
  const dispatch = useDispatch();


  return (
    <Container>
        <button 
            type="button" 
            className="header-sign-up-button" 
            onClick={() => {
                dispatch(authActions.setAuthMode("signup"));
                openModal();
            }}
        >
            회원가입
        </button>
        <button 
            type="button" 
            className="header-login-button"
            onClick={() => {
                dispatch(authActions.setAuthMode("login"));
                openModal();
            }}
        >
            로그인
        </button>
        <ModalPortal>
            <AuthModal closeModal={closeModal} />
        </ModalPortal>
    </Container>
  );
};

export default HeaderAuths;