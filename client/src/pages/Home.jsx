import React from "react";
import { Banner } from "../components/Banner";
import { Description } from "../components/Description";
import { Screenshot } from "../components/Screenshot";
import { PlayNow } from "../components/PlayNow";
import { useAuth } from "../context/auth";

export const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Banner />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <Description />
      <Screenshot />
      <PlayNow />
    </div>
  );
};
