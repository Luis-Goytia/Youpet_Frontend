import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ name, img }) {
  return (
    <div className="cardl">
      <div className="cardl_image">
        <img src={img} alt="Not found" />
      </div>
      <div className="cardl_title title-white">
        <p>{name}</p>
      </div>
    </div>
  );
}
