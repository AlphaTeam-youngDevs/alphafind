import React from "react";
import * as icon from "react-icons/bs";
import { createUser } from "../../../redux/actions";
import * as icons from "react-icons/ai";
import { connect } from "react-redux";
function SignUp(prop) {
  // ===========INFO STATE=========
  const [signUpInfo, setsignUpInfo] = React.useState({
    pass: true,
    disabled: true,
    texts: "",
    check: {
      userName: false,
      userEmail: false,
      UserPassword: false,
    },
    userName: "",
    userEmail: "",
    UserPassword: "",
    noNewsLetter: false,
  });
  var text, submitBtn;
  submitBtn = React.useRef();

  function setState() {
    setsignUpInfo((pre) => {
      return { ...pre, texts: text };
    });
  }

  // =======Name auth ======
  function passNameAuth(signame, e, name) {
    var targetName = e.target.name;
    if (signame.length < 7 && targetName === name) {
      text = `Enter a longer ${
        name === "UserPassword" ? "password" : "username"
      } with 5 or more characters`;
      e.target.parentNode.style.outline = "1px solid #fa6b6b";
      setState();
      return false;
    } else if (signame.length >= 7 && targetName === name) {
      e.target.parentNode.style.outline = "2px solid rgb(88, 151, 88)";
      text = "";
      setState();
      return true;
    }
  }

  // ===========EMAIL AUTH======

  function emailVal(e) {
    var emailReg =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (e.target.name === "userEmail" && !emailReg.test(signUpInfo.userEmail)) {
      e.target.parentNode.style.outline = "1px solid #fa6b6b";
      text = "Enter valid email";
      setState();
      return false;
    } else if (
      e.target.name === "userEmail" &&
      emailReg.test(signUpInfo.userEmail)
    ) {
      e.target.parentNode.style.outline = "2px solid rgb(88, 151, 88)";
      text = "";
      setState();
      return true;
    }
  }

  // ===============TOGGLE PASS=======

  var userName, userEmail, UserPassword;

  function changePassType() {
    setsignUpInfo((pre) => {
      return {
        ...pre,
        pass: !signUpInfo.pass,
      };
    });
  }
  // ========INPUT VALUE=======
  function inputValue(e) {
    var name = e.target.name;
    setsignUpInfo((pre) => {
      return {
        ...pre,
        [name]: name === "noNewsLetter" ? !e.target.checked : e.target.value,
      };
    });

    // =======Name auth ======

    userName = passNameAuth(signUpInfo.userName, e, "userName");
    UserPassword = passNameAuth(signUpInfo.UserPassword, e, "UserPassword");
    userEmail = emailVal(e);

    setsignUpInfo((pre) => {
      return {
        ...pre,
        check: {
          ...signUpInfo.check,
          [e.target.name]:
            e.target.name === "userName"
              ? userName
              : e.target.name === "userEmail"
              ? userEmail
              : UserPassword,
        },
      };
    });
    var sif = signUpInfo.check;
    if (sif.userEmail && sif.UserPassword && sif.userName) {
      setsignUpInfo((pre) => {
        return {
          ...pre,
          disabled: false,
        };
      });
    } else {
      setsignUpInfo((pre) => {
        return {
          ...pre,
          disabled: true,
        };
      });
    }
  }

  async function submit() {
    var sign = signUpInfo;
    var details = {
      name: sign.userName,
      password: sign.UserPassword,
      email: sign.userEmail,
      letter: sign.noNewsLetter,
    };
    await prop.create(details);
    setsignUpInfo((pre) => {
      return {
        ...pre,
        userName: "",
        userEmail: "",
        UserPassword: "",
        noNewsLetter: false,
      };
    });
  }

  // ===========RENDER==========
  return (
    <div className="signUp">
      {/* =========USERNAME===== */}
      <div className="username">
        <label htmlFor="username">
          <icon.BsPerson />
        </label>
        <input
          autoFocus={false}
          type="text"
          id="username"
          placeholder="Username"
          name="userName"
          value={signUpInfo.userName}
          onChange={inputValue}
        />
      </div>

      {/* ========Email======= */}
      <div className="username">
        <label htmlFor="email">
          <icons.AiOutlineMail />
        </label>
        <input
          autoFocus={false}
          type="text"
          id="email"
          placeholder="Email"
          name="userEmail"
          value={signUpInfo.userEmail}
          onChange={inputValue}
        />
      </div>
      {/* =============PASSWORD========= */}
      <div className="pass">
        <input
          autoFocus={false}
          type={signUpInfo.pass ? "password" : "text"}
          id="pass"
          value={signUpInfo.UserPassword}
          placeholder="Password"
          name="UserPassword"
          onChange={inputValue}
        />
        <label htmlFor="pass">
          <icon.BsLock className="lock" />
        </label>
        <span className="eye">
          <icon.BsEye onClick={changePassType} />
        </span>
      </div>
      <div className="inf">{signUpInfo.texts}</div>
      <div className="check">
        <input
          autoFocus={false}
          value={signUpInfo.noNewsLetter}
          type="checkbox"
          id="check"
          onChange={inputValue}
          name="noNewsLetter"
        />
        <label htmlFor="check">
          I do not wish to receive news and promotions from Alpha find by email
        </label>
      </div>
      <button
        type="submit"
        disabled={signUpInfo.disabled}
        ref={submitBtn}
        onClick={submit}
      >
        Sign Up
      </button>
    </div>
  );
}
const dispatchToProp = (dispatch) => ({
  create: (user) => dispatch(createUser(user)),
});
export default connect(null, dispatchToProp)(SignUp);
