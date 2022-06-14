import React, { createContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LandingPage from "./Pages/Landing.page/landing.page";
import Form from "./Pages/form/form";
import { AnimatePresence } from "framer-motion";
export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
