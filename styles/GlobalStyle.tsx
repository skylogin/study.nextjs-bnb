import { createGlobalStyle } from "styled-components";
import reset from "Styled-reset";
import palette from "./palette";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: ${palette.black};
  }
`;

export default GlobalStyle;