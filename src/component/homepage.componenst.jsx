import React from "react";
import "./homepage.styles.scss";
import Navbar from "./layouts/navbar/navbar.components";
import { Body } from "./body/body.component";
export const Homepage = () => {
  return (
    <div>
      <div className="homepage">
        <Navbar />
        <Body />
      </div>
    </div>
  );
};
