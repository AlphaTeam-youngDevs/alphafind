import React from "react";
import "./form.scss";
import SignIn from "../../components/form/login/SignIn";
import * as icon from "react-icons/fc";
import { motion } from "framer-motion";
import * as icons from "react-icons/fi";
import SignUp from "../../components/form/signup/SignUp";
export default function App() {
  const [sigIn, setSignin] = React.useState(true);
  let styleIn = {
    backgroundColor: sigIn ? "rgba(238, 209, 174, 0.644)" : "",
  };

  let styleUp = {
    backgroundColor: !sigIn ? "rgba(238, 209, 174, 0.644)" : "",
  };

  function toggleLoginOn() {
    setSignin(true);
  }
  function toggleLogin() {
    setSignin(false);
  }
  const containerVariant = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: "0%",
      transition: { delay: 0.1, duration: .6 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { ease: "easeInOut" },
    },
  };
  return (
    <>
      <motion.div
        className="form"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="app">
          <div className="button">
            <button className="signIn" onClick={toggleLoginOn} style={styleIn}>
              Sign in
            </button>
            <button className="signUp" style={styleUp} onClick={toggleLogin}>
              Sign up
            </button>
          </div>
          <div className="link">
            <button className="google">
              <icon.FcGoogle /> Google
            </button>
            <button className="facebook">
              <icons.FiFacebook className="face" /> Facebook
            </button>
          </div>
          {sigIn ? <SignIn /> : <SignUp />}
        </div>
        <p>
          Registering to this website, you accept our{" "}
          <a href="#">Terms of use</a> and our <a href="#">Privacy policy</a>.
        </p>
      </motion.div>
    </>
  );
}
