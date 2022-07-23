import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./filter.scss";
import { hall } from "../../halls/hall";
import { connect } from "react-redux";
import { searchAction } from "../../redux/search/search.action";
import { useEffect } from "react";
function Filter({ searchResult }) {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    room: null,
    area: null,
    priceMin: null,
    priceMax: null,
    pool: false,
    washer: true,
    wifi: false,
  });
  function handleChange(e) {
    setValue((pre) => {
      return {
        ...pre,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  }
  function showResult() {
    const searchHall = hall.filter(
      (el) =>
        el.location
          .toLowerCase()
          .includes(value.area?.toLowerCase() || el.location.toLowerCase()) &&
        el.pool === value.pool &&
        el.wifi === value.wifi &&
        el.washer === value.washer &&
        el.price >= (value.priceMin || el.price) &&
        el.numberInRoom === (parseInt(value.room) || el.numberInRoom)
    );
    searchResult(searchHall);
    navigate("/home");
  }
  useEffect(() => {
    console.log(value);
  });
  return (
    <div className="filter">
      <div className="nav">
        <button onClick={() => navigate("/home")}>{"<"}</button> Filter results
      </div>
      <div className="filterbody">
        <input
          onChange={handleChange}
          list="list"
          name="room"
          type="text"
          placeholder="Select room type"
        />
        <datalist id="list">
          <option value="2"> Two in one</option>
          <option value="3">3 in One</option>
          <option value="1"> One in One</option>
          <option value="4"> Four in One</option>
        </datalist>
        <input
          onChange={handleChange}
          list="area"
          name="area"
          type="text"
          placeholder="Select area"
        />
        <datalist id="area">
          <option value="kumasi">Kumasi</option>
          <option value="accra">Accra</option>
        </datalist>
        <div className="money">
          <h6>Price, GHS</h6>
          <div className="money_child">
            <div className="min">
              <label htmlFor="min">GHS</label>
              <input
                name="priceMin"
                onChange={handleChange}
                type="number"
                placeholder="Mininmum"
              />
            </div>
            <div className="max">
              <label htmlFor="max">GHS</label>
              <input
                name="priceMax"
                onChange={handleChange}
                type="number"
                placeholder="Maximum"
              />
            </div>
          </div>
        </div>
        <div className="amenity">
          <h5>Amenities</h5>
          <ul>
            <li>
              <input
                onChange={handleChange}
                id="washer"
                name="washer"
                type="checkbox"
                checked={value.washer}
              />
              <label htmlFor="washer">Washer</label>
            </li>
            <li>
              <input
                onChange={handleChange}
                id="pool"
                name="pool"
                type="checkbox"
              />
              <label htmlFor="pool">Pool</label>
            </li>
            <li>
              <input
                onChange={handleChange}
                id="wifi"
                name="wifi"
                type="checkbox"
              />
              <label htmlFor="wifi">Free wifi</label>
            </li>
          </ul>
        </div>
        <button onClick={showResult}>Show results</button>
      </div>
    </div>
  );
}
const dispatchToProp = (dispatch) => ({
  searchResult: (search) => dispatch(searchAction(search)),
});
export default connect(null, dispatchToProp)(Filter);
