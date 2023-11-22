import React, { useEffect } from "react";
import { Banner } from "../../components/Banner";
import { Description } from "../../components/Description";
import { Screenshot } from "../../components/Screenshot";
import { PlayNow } from "../../components/PlayNow";
import { useAuth } from "../../context/auth";
import { Layout } from "../../components/Layout";
import ScrollButton from "../../components/ScrollButton"; 

export const Home = () => {
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Banner />
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <Description />
      <Screenshot />
      <PlayNow />
      <ScrollButton /> 
    </Layout>
  );
};
