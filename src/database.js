import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { hall } from "./halls/hall";
const firebaseConfig = {
  apiKey: "AIzaSyCptUc9VPP3yjEsBc8MyXKYeWHNZj_Lo9Y",
  authDomain: "teamalpha-a6e7e.firebaseapp.com",
  databaseURL: "https://teamalpha-a6e7e-default-rtdb.firebaseio.com",
  projectId: "teamalpha-a6e7e",
  storageBucket: "teamalpha-a6e7e.appspot.com",
  messagingSenderId: "869397455643",
  appId: "1:869397455643:web:7fc77348e4e966c56869be",
};
const app = initializeApp(firebaseConfig);

function setdata() {
  const database = getDatabase(app);
  const halls = JSON.stringify(hall);
  set(ref(db, "halls"), {
    halls,
  });
}
setdata();
