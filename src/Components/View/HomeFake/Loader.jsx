import React from "react";
import LoaderImage from "../../../img/loading_dualring.svg";
import logo from "../../../img/logo.png";
export default function Loader() {
  return (
    <div className="loaderr">
      <img src={logo} alt="logo" />
      <img src={LoaderImage} alt="loading..." />
    </div>
  );
}
