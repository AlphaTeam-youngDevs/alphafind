import React from "react";
import "./landingpage.scss";

export default function LandingPageComp(prop) {
  return (
    <div className="land_comp">
      <img src={prop.image} alt={`${prop.header}`} />
      <h3>{prop.header}</h3>
      <p>{prop.about}</p>
    </div>
  );
}
