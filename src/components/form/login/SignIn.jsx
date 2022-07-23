import React from "react";
import * as icon from "react-icons/bs";
import { connect } from "react-redux";
import { signWithEmail } from "../../../redux/actions";
function SignIn(prop) {
  const { signInWithEmailPas } = prop;
  const [signIn, setSignIn] = React.useState({
    password: "",
    userName: "",
    passState: true,
    state: true,
  });
  async function signInFun(e) {
    var targetName = e.target.name;
    setSignIn((pre) => {
      return { ...pre, [targetName]: e.target.value };
    });
    if (signIn.password.length >= 5 && signIn.userName.length >= 5) {
      setSignIn((pre) => {
        return {
          ...pre,
          state: false,
        };
      });
    } else {
      setSignIn((pre) => {
        return {
          ...pre,
          state: true,
        };
      });
    }
  }
  function changePassType() {
    setSignIn((pre) => {
      return {
        ...pre,
        passState: !signIn.passState,
      };
    });
  }
  async function submit() {
    var data = { username: signIn.userName, password: signIn.password };
    signInWithEmailPas(data);
  }

  return (
    <div className="signin">
      {/* =========USERNAME===== */}
      <div className="username">
        <label htmlFor="username">
          <icon.BsPerson />
        </label>
        <input
          autoFocus={false}
          value={signIn.userName}
          type="text"
          id="username"
          name="userName"
          placeholder="Username or Email"
          onChange={signInFun}
        />
      </div>
      {/* =============PASSWORD========= */}
      <div className="pass">
        <label htmlFor="pass">
          <icon.BsLock />
        </label>
        <input
          value={signIn.password}
          autoFocus={false}
          type={signIn.passState ? "password" : "text"}
          id="pass"
          name="password"
          placeholder="Password"
          onChange={signInFun}
        />
        <span className="eye">
          <icon.BsEye className="lock" onClick={changePassType} />
        </span>
      </div>
      <span className="span" onClick={prop.eventHandle}>
        Forgot your password ?
      </span>
      <button type="submit" onClick={submit} disabled={signIn.state}>
        Sign in
      </button>
    </div>
  );
}

const dispatch = (dispatch) => ({
  signInWithEmailPas: (user) => dispatch(signWithEmail(user)),
});
export default connect(null, dispatch)(SignIn);
