import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { db } from "../../emailAuth";
import { onLoad } from "../../redux/actions";
import { getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Formredirect({ children, user, onload }) {
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const results = await getDoc(doc(db, "users", user.uid));
          onload(results.data());
        } catch (error) {
          console.log(error);
        }
      } else {
        onload(null);
      }
    });
  }, [user, auth,onload]);
  return !user ? children : <Navigate to="/home" />;
}
const maptoState = (state) => ({
  user: state.user.currentUser,
});
const dispatchtoProps = (dispatch) => ({
  onload: (user) => dispatch(onLoad(user)),
});
export default connect(maptoState, dispatchtoProps)(Formredirect);
