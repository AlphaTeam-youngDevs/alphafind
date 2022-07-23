import "./App.css";
import { Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { useLocation } from "react-router-dom";
import LandingPage from "./Pages/Landing.page/landing.page";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { Provider } from "react-redux";
import Home from "./Pages/homepage/home";
import Payment from "./components/payment/payment";
import Appfull from "./components/appful/appful";
import Profile from "./components/profile/profile";
import ProfileMenu from "./components/profilemenu/profile";
import EditProfile from "./components/editProfile/editprofile";
import BookNow from "./components/bookNow/bookNow";
import Formredirect from "./components/formRedirect/formredirect";
import BookNowRoute from "./components/bookNowPrivate/bookNow";
import Note from "./components/note/note";
import Filter from "./components/filter/filter";
import BookConfirmation from "./components/confirmation/bookconfirmation";
import Receipt from "./components/bookReceipt/bookReceipt";
const PageNoteFound = () => <h4>Page Not Found</h4>;
export default function App() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <div className="App">
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route
              path="/"
              element={
                <Formredirect>
                  <LandingPage />
                </Formredirect>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            >
              <Route index element={<Appfull />} />
              <Route path="appfull" element={<Appfull />} />
              <Route path="note" element={<Note />} />
            </Route>
            <Route
              path="/book"
              element={
                <PrivateRoute>
                  <Receipt />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/book/:hallid"
              element={
                <BookNowRoute>
                  <BookNow />
                </BookNowRoute>
              }
            />
            <Route
              path="/confirm_book/:id"
              element={
                <PrivateRoute>
                  <BookConfirmation />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route path="/menu/:id" element={<ProfileMenu />} />
            <Route path="*" element={<PageNoteFound />} />
            <Route
              path="/filter"
              element={
                <PrivateRoute>
                  <Filter />
                </PrivateRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Provider>
  );
}
