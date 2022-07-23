import React, { useState } from "react";
import "./bookNow.scss";
import { GoPerson } from "react-icons/go";
import {
  MdLocationOn,
  MdPool,
  MdOutlineHotTub,
  MdLocalLaundryService,
} from "react-icons/md";
import { hall } from "../../halls/hall";
import { HiOutlineWifi } from "react-icons/hi";
import { FaBed } from "react-icons/fa";
import { GiBrainFreeze, GiWashingMachine } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
function BookNow() {
  const param = useParams();
  const navigate = useNavigate();

  const detail = hall[parseInt(param.hallid)];

  const [image, setImage] = useState(detail.images[0]);
  return (
    <div className="bookNow">
      <div className="image_bookage">
        <div className="back_btn" onClick={() => navigate("/home")}>
          {"<"}
        </div>
        <img src={image} alt="hall" />
      </div>
      <div className="image_caro">
        {detail.images.map((el, id) => {
          return (
            <img
              onClick={() => setImage(detail.images[id])}
              src={el}
              key={id}
              alt="hall"
            />
          );
        })}
      </div>
      <div className="descript">
        <h3>Description</h3>
        <p>{detail.descript}</p>
        <div className="more">
          <span>
            <MdLocationOn />
            {detail.location.slice(0, 9)}...
          </span>
          <span>
            <FaBed /> {detail.numberInRoom} in 1
          </span>
          <span>
            <GoPerson /> {detail.numberLeft} left
          </span>
        </div>
      </div>
      <div className="amenities">
        <h3>Popular amenities</h3>
        <ul>
          {detail.pool && (
            <li>
              <MdPool /> Pool
            </li>
          )}
          {detail.wifi && (
            <li>
              <HiOutlineWifi /> Free Wi-Fi
            </li>
          )}
          {detail.aircon && (
            <li>
              <GiBrainFreeze /> Air Conditioning
            </li>
          )}
          {detail.hotTub && (
            <li>
              <MdOutlineHotTub /> Hot Tub
            </li>
          )}
          {detail.dryer && (
            <li>
              <MdLocalLaundryService />
              Dryer
            </li>
          )}
          {detail.washer && (
            <li>
              <GiWashingMachine /> Washer
            </li>
          )}
        </ul>
      </div>
      <div className="price">
        <div className="money">
          <h6>Price</h6>
          GHS {detail.price}/ Sem
        </div>
        <div
          className="bookNow_btn"
          onClick={() =>
            navigate(`/confirm_book/${detail.id}`)
          }
        >
          Book Now
        </div>
      </div>
    </div>
  );
}

export default BookNow;
