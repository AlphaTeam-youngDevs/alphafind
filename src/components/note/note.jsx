import React from "react";
import "./note.scss";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { TbBellRinging } from "react-icons/tb";
import { messageSelector } from "../../redux/message.select";
import { connect } from "react-redux";
function Note({ message }) {
  const navigate = useNavigate();
  return (
    <div className="note">
      <div className="back">
        <div className="back_btn" onClick={() => navigate("/home")}>
          {"<"}
        </div>{" "}
        Your notifications
      </div>
      {message.length ? (
        <div className="notification_side">
          <ul>
            {message.map((el, id) => {
              return (
                <li key={id}>
                  <TbBellRinging className="icon" />
                  <div className="text">{el}</div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : <h4>No notification</h4>}
    </div>
  );
}
const message = createStructuredSelector({
  message: messageSelector,
});
export default connect(message)(Note);
