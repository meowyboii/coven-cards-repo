import React from "react";
import { Banner } from "../components/Banner";
import { Description } from "../components/Description";
import { Screenshot } from "../components/Screenshot";
import { PlayNow } from "../components/PlayNow";

export const Home = () => {
  return (
    <div>
      <Banner />
      <Description />
      <Screenshot />
      <PlayNow />
    </div>
  );
};
