import React from "react";
import "./mainPage.scss";
import knust from "../../schools/Image.png";
import cu from "../../schools/Image1.png";
import ug from "../../schools/ug.png";
import uew from "../../schools/Image2.png";
import ucc from "../../schools/Image3.png";
import uds from "../../schools/Image5.png";
import Loading from "../loadingandnotification/loading";
import { chooseSchool } from "../../redux/actions";
import upsa from "../../schools/Image4.png";
import { connect } from "react-redux";
import { useState } from "react";
import Info from "../info/info";
function ChooseSchool({ state, choose }) {
  const [schoolVal, setSchoolVal] = useState("ug");
  function handleEvent(e) {
    setSchoolVal(e.target.id);
  }

  async function updateSchool() {
    choose(schoolVal);
  }
  return (
    <div className="main">
      <Info />
      <Loading inactive={state} />
      <div className="buttons">
        <button onClick={updateSchool}>{"<"}</button>{" "}
        <span>Select your school</span>
      </div>
      <div className="schools">
        <div className="school">
          <label htmlFor="ug">
            <img src={ug} alt="ug" /> University of Ghana
          </label>
          <input
            onChange={handleEvent}
            checked={schoolVal === "ug"}
            name="school"
            type="radio"
            id="ug"
          />
        </div>
        <div className="school">
          <label htmlFor="knust">
            <img src={knust} alt="knust" /> Kwame Nkrumah University of Science
            & Tech
          </label>
          <input
            onChange={handleEvent}
            checked={schoolVal === "knust"}
            name="school"
            type="radio"
            id="knust"
          />
        </div>
        <div className="school">
          <label htmlFor="cu">
            <img src={cu} alt="cu" /> Central University
          </label>
          <input
            onChange={handleEvent}
            checked={schoolVal === "cu"}
            name="school"
            type="radio"
            id="cu"
          />
        </div>
        <div className="school">
          <label htmlFor="uew">
            <img src={uew} alt="uew" /> University of Education, Winneba
          </label>
          <input
            onChange={handleEvent}
            checked={schoolVal === "uew"}
            name="school"
            type="radio"
            id="uew"
          />
        </div>
        <div className="school">
          <label htmlFor="uds">
            <img src={uds} alt="uds" /> University for Development Studies
          </label>
          <input
            onChange={handleEvent}
            checked={schoolVal === "uds"}
            name="school"
            type="radio"
            id="uds"
          />
        </div>
        <div className="school">
          <label htmlFor="ucc">
            <img src={ucc} alt="ucc" /> University of Cape Coast
          </label>
          <input
            onChange={handleEvent}
            name="school"
            type="radio"
            id="ucc"
            checked={schoolVal === "ucc"}
          />
        </div>
        <div className="school">
          <label htmlFor="upsa">
            <img src={upsa} alt="upsa" /> University of Professional Studies
          </label>
          <input
            onChange={handleEvent}
            checked={schoolVal === "upsa"}
            name="school"
            type="radio"
            id="upsa"
          />
        </div>
        <button onClick={updateSchool}>Continue</button>
      </div>
    </div>
  );
}
const setState = (dispatch) => ({
  choose: (school) => dispatch(chooseSchool(school)),
});
const maptostate = (state) => ({
  state: state.user.loading,
});
export default connect(maptostate, setState)(ChooseSchool);
