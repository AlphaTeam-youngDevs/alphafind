import React from "react";
import "./loading.scss"
export default function Loading(prop) {

  return (
    <div className={"loading" + (prop.inactive ? " inactive": "")}>
      <div className="circle">
        <div className="innercircle"></div>
        <div className="loader"></div>
      </div>
    </div>
  );
}
