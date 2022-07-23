import React from "react";
import "./form.scss";
import Info from "../../components/info/info";
import { connect } from "react-redux";
import Privacy from "../../components/privacy/privacy";
import Terms from "../../components/terms/terms";
import Loading from "../../components/loadingandnotification/loading";
import Forgot from "../../components/forgotpass/forgot";
import { google_signin } from "../../redux/actions";
import SignIn from "../../components/form/login/SignIn";
import * as icon from "react-icons/fc";
import { motion } from "framer-motion";
import * as icons from "react-icons/fi";
import SignUp from "../../components/form/signup/SignUp";
import { useState } from "react";
import { loader } from "../../redux/message.select";
import { message } from "../../redux/message.select";
import { createStructuredSelector } from "reselect";
function Form(prop) {
  const { google, loader } = prop;
  const [forgot, setForgot] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [sigIn, setSignin] = React.useState("signin");
  const [terms, setTerms] = useState(false);
  let styleIn = {
    backgroundColor: sigIn === "signin" ? "rgba(238, 209, 174, 0.644)" : "",
  };
  function changeView() {
    setForgot((pre) => !pre);
  }
  let styleUp = {
    backgroundColor: sigIn === "signup" ? "rgba(238, 209, 174, 0.644)" : "",
  };
  const containerVariant = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: "0%",
      transition: { delay: 0.1, duration: 0.6 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { ease: "easeInOut" },
    },
  };

  async function signWithGoogle(provider) {
    await google(provider);
  }
  return (
    <motion.div
      className="form"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Info />
      <Loading inactive={loader} />{" "}
      {!forgot ? (
        <div className="app">
          <div className="button">
            <button
              className="signIn"
              onClick={() => setSignin("signin")}
              style={styleIn}
            >
              Sign in
            </button>
            <button
              className="signUp"
              style={styleUp}
              onClick={() => setSignin("signup")}
            >
              Sign up
            </button>
          </div>
          <div className="link">
            <button className="google" onClick={() => signWithGoogle("google")}>
              <icon.FcGoogle /> Google
            </button>
            <button
              className="facebook"
              onClick={() => signWithGoogle("facebook")}
            >
              <icons.FiFacebook className="face" /> Facebook
            </button>
          </div>
          {sigIn === "signin" ? (
            <SignIn  eventHandle={changeView} />
          ) : (
            <SignUp  />
          )}
        </div>
      ) : (
        <Forgot eventHandle={changeView} />
      )}
      <p className="foot">
        Registering to this website, you accept our{" "}
        <span onClick={() => setTerms((pre) => !pre)}>Terms of use</span> and
        our{" "}
        <span onClick={() => setPrivacy((pre) => !pre)}>Privacy policy</span>.
      </p>
      <Privacy privacy={privacy} toggle={() => setPrivacy((pre) => !pre)} />
      <Terms terms={terms} toggle={() => setTerms((pre) => !pre)} />
    </motion.div>
  );
}

const maptoState = createStructuredSelector({
  loader: loader,
  message: message,
});
const dispatch = (dispatch) => ({
  google: (service) => dispatch(google_signin(service)),
});
export default connect(maptoState, dispatch)(Form);
