import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
function PrivateRoute({ children, user }) {
  return user ? children : <Navigate to="/" />;
}
const maptoState = (state) => ({
  user: state.user.currentUser,
});
export default connect(maptoState)(PrivateRoute);
