import {
  onSignInWithGoogle,
  onSignInWithEmailAndPass,
  onSignUp,
  chooseschool,
  signOut_saga,
  updateUser,
} from "./sign/signin.saga";
import { all, call } from "redux-saga/effects";

export default function* rootsaga() {
  yield all([
    call(onSignInWithGoogle),
    call(onSignInWithEmailAndPass),
    call(onSignUp),
    call(chooseschool),
    call(signOut_saga),
    call(updateUser),
  ]);
}
