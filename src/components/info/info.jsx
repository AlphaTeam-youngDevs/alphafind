import React from "react";
import "./info.scss";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useRef } from "react";
import { createStructuredSelector } from "reselect";
import { message } from "../../redux/message.select";
import { useEffect } from "react";
import { connect } from "react-redux";
import { toggleInfo } from "../../redux/actions";
function Info({ message, toggle }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.onanimationend = (e) => {
      e.target.classList.remove("active");
      toggle();
    };
  });
  return (
    <div
      ref={ref}
      className={
        message.active && message.success
          ? "info active"
          : message.active && !message.success
          ? "active info danger"
          : "info"
      }
    >
      <div className="text">
        {message.success ? (
          <IoMdCheckmarkCircleOutline className="warn" />
        ) : (
          <div className="warn x">X</div>
        )}{" "}
        {message.text}
      </div>
    </div>
  );
}
const maptoState = createStructuredSelector({
  message: message,
});
const dispatchToProp = (dispatch) => ({
  toggle: () => dispatch(toggleInfo()),
});
export default connect(maptoState, dispatchToProp)(Info);
