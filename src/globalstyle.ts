import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css");

  body {
    font-family: "Pretendard", sans-serif;
  }
`;

export default GlobalStyle;
