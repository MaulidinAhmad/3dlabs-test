import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { context } from "../../store";
import { getLocalStorage } from "../../store/local_storage";
import Navbar from "../Navbar/Navbar";

const Layout: React.FC<{ children: any }> = (props) => {
  const ctx = context();
  const router = useRouter();

  useEffect(() => {
    if (getLocalStorage()?.userData) {
      ctx.dispatch({ userData: getLocalStorage()?.userData });
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
