import App, { AppContext, AppProps } from "next/app";

import { wrapper } from "../store";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyle from "../styles/GlobalStyle";

import { userActions } from "../store/user";

import axios from "../lib/api";
import { cookieStringToObject } from "../lib/utils";

import { meAPI } from "../lib/api/auth";

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

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await meAPI();
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (e) {
    console.log(e.message);
  }
  return { ...appInitialProps };
};

export default wrapper.withRedux(app);