import React from "react";
import "./bookconfirmation.scss";
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { hall } from "../../halls/hall";
import { useSelector } from "react-redux";
function BookConfirmation() {
  const navigate = useNavigate();
  const param = useParams();
  const halldetail = hall[parseInt(param.id)];
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="bookConfirm">
      <div className="con_btn">
        <button onClick={() => navigate(`/book/${halldetail.id}`)}>
          {"<"}
        </button>{" "}
        Booking details
      </div>
      <div className="body-confirm">
        <div className="top">
          <span>
            <img src={halldetail.images[0]} alt="hall" />
          </span>{" "}
          <div className="label">
            <h3>{halldetail.name}</h3>
            <div className="location">
              <span>
                <MdLocationOn /> {halldetail.location}
              </span>
              <span>
                <FaBed />
                {halldetail.numberInRoom} in 1
              </span>
            </div>
          </div>
        </div>
        <div className="des">
          <h5>Description</h5>
          <p>{halldetail.descript}</p>
        </div>
        <div className="date">
          <div className="start">
            <h6>Booked Date</h6>
            {day}th {months[month]}, {year}
          </div>
          <div className="end">
            <h6>Renewal Date</h6>
            {day}th {months[month]}, {year + 1}
          </div>
        </div>
        <div className="student_detail">
          <h5>Student Details</h5>
          <span>
            <div className="label_student">Name</div> {currentUser.name}
          </span>
          <span>
            <div className="label_student">Email</div> {currentUser.email}
          </span>
        </div>
        <div className="bottom_conf">
          <div className="price_conf">
            Price
            <div className="money_conf">GHS {halldetail.price}/ sem</div>
          </div>
          <button
            onClick={() => {
              navigate("/payment");
            }}
          >
            Confirm {"&"} Pay
          </button>
        </div>
      </div>
    </div>
  );
}
export default BookConfirmation;
