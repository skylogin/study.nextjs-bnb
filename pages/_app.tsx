import { AppProps } from "next/app";

// import { wrapper } from "../store";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyle from "../styles/GlobalStyle";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <div id="root-modal" />
    </>
  );
};

// export default wrapper.withRedux(app);
export default app;