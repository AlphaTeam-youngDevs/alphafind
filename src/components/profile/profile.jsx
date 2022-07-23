import React from "react";
import "./profile.scss";
import { AiOutlineLock } from "react-icons/ai";
import { GiOpenBook } from "react-icons/gi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { FaRegCommentAlt } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { signOut } from "../../redux/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Profile({ signout, currentUser }) {
  const [closePop, setClosePop] = useState(false);
  const navigate = useNavigate();
  async function signoutFun() {
    await signout();
    navigate("/");
  }
  return (
    <div className="profileset">
      <div className={closePop ? "popup open" : "popup"}>
        <div className="wrap">
          <h4>Log out ?</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            deleniti? Fugiat ad aliquid asperiores fuga?
          </p>
          <div className="option">
            <div className="cancel" onClick={() => setClosePop(false)}>
              Cancel
            </div>
            <div className="logout" onClick={signoutFun}>
              log out
            </div>
          </div>
        </div>
      </div>
      <div className="back" onClick={() => navigate("/home")}>
        {"<"}
      </div>
      <div className="edit">
        <img src={currentUser.photoUrl} alt="user" />
        <span className="name">{currentUser.name}</span>
        <span className="profileedit" onClick={() => navigate("/edit")}>
          Edit Profile
        </span>
      </div>
      <div className="link">
        <div className="policy" onClick={() => navigate("/menu/privacy")}>
          <div className="label">
            <AiOutlineLock className="icon" />
            Privacy Policy
          </div>
          {">"}
        </div>
        <div className="policy" onClick={() => navigate("/menu/terms")}>
          <div className="label">
            <GiOpenBook className="icon" />
            Terms & Conditions
          </div>
          {">"}
        </div>
        <div className="policy">
          <div className="label">
            <HiOutlineQuestionMarkCircle className="icon" />
            FAQ
          </div>
          {">"}
        </div>
        <div className="policy">
          <div className="label">
            <FaRegCommentAlt className="icon" />
            Support
          </div>
          {">"}
        </div>
        <div className="policy">
          <div className="label">
            <GrCircleInformation className="icon" />
            About
          </div>
          {">"}
        </div>
      </div>
      <div className="logout" onClick={() => setClosePop(true)}>
        Log Out
      </div>
    </div>
  );
}
const maptoState = (state) => ({
  currentUser: state.user.currentUser,
});
const setUser = (dispatch) => ({
  signout: () => dispatch(signOut()),
});
export default connect(maptoState, setUser)(Profile);
