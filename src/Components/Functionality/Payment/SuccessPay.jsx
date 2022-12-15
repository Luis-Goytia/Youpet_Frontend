import React from "react";
import { Link } from "react-router-dom";
import img from "../../../img/acaricia.gif";
import "./ErrorPay.css";
export default function SuccesPay() {
  return (
    <div className="errorNoti">
      <h1>Your turn is already reserved.</h1>
          <img src={img} alt="img-paynofound" className="imgCat" />
          <h1>Wait with your pet until the day</h1>
      <div className="buttonn">
        <Link
          to="/"
          type="button"
          className="text-decoration-none btn btn-dark"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
