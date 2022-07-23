import React from "react";
import { Navigate,useParams } from "react-router-dom";
import { connect } from "react-redux";
import { hall } from "../../halls/hall";
function BookNowRoute({ children, user }) {
  const param = useParams();
  const detail = hall[parseInt(param.hallid)];
  return user && detail ? (
    children
  ) : !detail ? (
    <Navigate to="*" />
  ) : (
    <Navigate to="/" />
  );
}
const maptoState = (state) => ({
  user: state.user.currentUser,
});
export default connect(maptoState)(BookNowRoute);
