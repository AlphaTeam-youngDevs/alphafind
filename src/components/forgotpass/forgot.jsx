import React from "react";
import "./forgot.scss";
import { useState } from "react";
import * as icon from "react-icons/bs";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Info from "../info/info";
export default function Forgot(prop) {
  const [confirmMail, setConfirm] = useState(true);
  const [emails, setEmail] = useState("");
  const [info, setInfo] = useState({});
  function emailFun(e) {
    setEmail(e.target.value);
  }
  async function change() {
    if (emails.length === 0) return;
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, emails);
      setConfirm((pre) => !pre);
    } catch (err) {
      setInfo((pre) => ({
        ...pre,
        text: "Unable to reset password",
        active: true,
        success: false,
      }));
    }
  }

  return (
    <div className={!confirmMail ? "app-form confirm" : "app-form"}>
      {confirmMail ? (
        <>
          <Info {...info} setState={() => setInfo({})} />
          <h3>Forgot your password?</h3>
          <h5>Please enter your email address</h5>
          <div className="username">
            <label htmlFor="username">
              <icon.BsPerson />
            </label>
            <input
              autoFocus={false}
              value={emails}
              type="text"
              id="username"
              name="userName"
              placeholder="Email"
              onChange={emailFun}
            />
          </div>
          <button onClick={change}>Continue</button>
        </>
      ) : (
        <>
          <h3>We almost finished</h3>
          <p>
            Check your mail, We have sent you the necessary instructions to
            recover your password
          </p>
        </>
      )}
      <span onClick={prop.eventHandle}>Go back to sign in page</span>
    </div>
  );
}
