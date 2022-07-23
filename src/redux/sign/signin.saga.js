import { put, takeLatest } from "redux-saga/effects";
import { actions } from "../action.type";
import profile from "../../images/download.png";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { google_sign_error, google_sign_success } from "../actions";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../../emailAuth";
const auth = getAuth();

function* createUser(uid, { ...details }) {
  yield setDoc(doc(db, "users", uid), {
    email: details.email,
    name: details.displayName,
    photoUrl: details.photoURL,
    noNewsLetter: false,
    school: null,
    messages: [
      "Welcome to AlphaFind. Help us to help you find accommodation anywhere near you.",
    ],
  });
}

function* signGoogle({ payload }) {
  var provider;
  if (payload === "facebook") {
    provider = new FacebookAuthProvider();
  } else {
    provider = new GoogleAuthProvider();
  }

  try {
    const result = yield signInWithPopup(auth, provider);
    const user = result.user;
    const results = yield getDoc(doc(db, "users", user.uid));
    if (!results.exists()) {
      yield createUser(user.uid, user);
    }
  } catch (error) {
    yield put(
      google_sign_error({
        text: "Could not get you signed in",
        active: true,
        success: false,
      })
    );
  }
  try {
    const results = yield getDoc(doc(db, "users", auth.currentUser.uid));
    yield put({ type: actions.SIGN_IN_SUCCESS, payload: results.data() });
  } catch (error) {
    yield put(
      google_sign_error({
        text: "Could not get you signed in",
        active: true,
        success: false,
      })
    );
  }
}

export function* onSignInWithGoogle() {
  yield takeLatest(actions.GOOGLE_SIGN_IN, signGoogle);
}

function* signWithEmailAndPass({ payload: { username, password } }) {
  try {
    const data = yield signInWithEmailAndPassword(auth, username, password);
    const results = yield getDoc(doc(db, "users", data.user.uid));
    yield put({ type: actions.SIGN_IN_SUCCESS, payload: results.data() });
  } catch (error) {
    yield put(
      google_sign_error({
        active: true,
        success: false,
        text: error.message,
      })
    );
  }
}

export function* onSignInWithEmailAndPass() {
  yield takeLatest(actions.SIGN_WITH_EMAIL, signWithEmailAndPass);
}

function* signUp({ payload: { email, password, name } }) {
  const details = {
    displayName: name,
    photoURL: profile,
    email: email,
  };
  try {
    const data = yield createUserWithEmailAndPassword(auth, email, password);
    yield createUser(data.user.uid, details);
    yield put(
      google_sign_success({
        active: true,
        success: true,
        text: "user created successfully",
      })
    );
  } catch (error) {
    yield put(
      google_sign_error({
        active: true,
        success: false,
        text: error.message,
      })
    );
  }
}
export function* onSignUp() {
  yield takeLatest(actions.CREATE_USER, signUp);
}

function* chooseSchool({ payload }) {
  const schoolUp = doc(db, "users", auth.currentUser.uid);
  try {
    yield updateDoc(schoolUp, {
      school: payload,
    });
    const result = yield getDoc(doc(db, "users", auth.currentUser.uid));
    yield put({ type: actions.SIGN_IN_SUCCESS, payload: result.data() });
  } catch (error) {
    yield put(
      google_sign_success({
        text: error.message,
        active: true,
        success: false,
      })
    );
  }
}

export function* chooseschool() {
  yield takeLatest(actions.CHOOSE_SCHOOL, chooseSchool);
}

function* signout() {
  try {
    yield signOut(auth);
    yield put({ type: actions.SIGNED_OUT });
  } catch (error) {
    yield put(
      google_sign_success({
        text: error.message,
        active: true,
        success: false,
      })
    );
  }
}

export function* signOut_saga() {
  yield takeLatest(actions.SIGN_OUT, signout);
}

function* update({ payload }) {
  try {
    yield setDoc(doc(db, "users", auth.currentUser.uid), payload);
    const result = yield getDoc(doc(db, "users", auth.currentUser.uid));
    yield put({ type: actions.SIGN_IN_SUCCESS, payload: result.data() });
    yield put(
      google_sign_success({
        text: "User info updated",
        active: true,
        success: true,
      })
    );
  } catch (err) {
    yield put(
      google_sign_success({
        text: err.message,
        active: true,
        success: false,
      })
    );
  }
}

export function* updateUser() {
  yield takeLatest(actions.UPDATE_USER, update);
}
