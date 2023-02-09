// import '@/styles/globals.css'
import { StoreContextWrapper } from "@/store";
import "../scss/main.scss";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import reducer from "@/store/reducer";
import { globalState } from "@/store/state";
import Layout from "@/components/Layout/MainLayout";
import { AppPropsWithLayout } from "@/components/Layout/NestedLayout";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [state, dispatch] = useReducer(reducer, globalState);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <StoreContextWrapper.Provider value={{ state, dispatch }}>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      {/* <Component {...pageProps} /> */}
    </StoreContextWrapper.Provider>
  );
}
