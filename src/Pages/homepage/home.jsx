import React from "react";
import "./home.scss";
import { searchAction } from "../../redux/search/search.action";
import { connect } from "react-redux";
import { GoHome } from "react-icons/go";
import { BiBookmark, BiUserCircle } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import ChooseSchool from "../../components/chooseschool/chooseSchool";
import { useNavigate } from "react-router-dom";
import { userDetail } from "../../redux/message.select";
import { messageSelector } from "../../redux/message.select";
import { createStructuredSelector } from "reselect";
function Home({ currentUser, message, search }) {
  const navigate = useNavigate();
  return currentUser.school ? (
    <div className="appful">
      <Outlet />
      <div className="footer">
        <GoHome
          className="icon"
          onClick={() => {
            search(null);
            navigate("/home/appfull");
          }}
        />
        <div className="bell">
          <span style={{ display: !message.length && "none" }}>
            {message.length}
          </span>
          <FaBell className="icon" onClick={() => navigate("/home/note")} />
        </div>
        <BiBookmark className="icon" onClick={() => navigate("/book")} />
        <BiUserCircle className="icon" onClick={() => navigate("/profile")} />
      </div>
    </div>
  ) : (
    <ChooseSchool />
  );
}
const maptostate = createStructuredSelector({
  currentUser: userDetail,
  message: messageSelector,
});
const dispatchTopProp = (dispatch) => ({
  search: (search) => dispatch(searchAction(search)),
});
export default connect(maptostate, dispatchTopProp)(Home);
