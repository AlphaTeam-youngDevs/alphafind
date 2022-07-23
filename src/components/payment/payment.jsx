import React from "react";
import "./payment.scss";
import voda from "../../images_payment/Image-1.png";
import myGy from "../../images_payment/Image-2.png";
import visa from "../../images_payment/Image-3.png";
import bank from "../../images_payment/Image-4.png";
import mtn from "../../images_payment/Image.png";
import master from "../../images_payment/Image-5.png";
import invoice from "../../images_payment/invoice.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
function Payment() {
  const selectData = useSelector((state) => state);
  console.log(selectData);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  return !confirm ? (
    <div className="payment">
      <div className="top_payment">
        <button onClick={() => navigate("/home")}>{"<"}</button> Payment method
      </div>
      <div className="payment_body">
        <ul>
          <li>
            <label htmlFor="mtn">
              {" "}
              <img src={mtn} alt="pay" />
              MTN Mobile Money
            </label>
            <input type="radio" name="pay" id="mtn" />
          </li>
          <li>
            <label htmlFor="vodafone">
              <img src={voda} alt="pay" /> Vodafone Cash
            </label>
            <input type="radio" name="pay" id="vodafone" />
          </li>
          <li>
            <label htmlFor="mygpay">
              <img src={myGy} alt="pay" />
              My GHpay
            </label>
            <input type="radio" name="pay" id="mygpay" />
          </li>
          <li>
            <label htmlFor="bank">
              {" "}
              <img src={bank} alt="pay" />
              Bank
            </label>
            <input type="radio" name="pay" id="bank" />
          </li>
          <li>
            <label htmlFor="visa">
              {" "}
              <img src={visa} alt="pay" />
              Visa
            </label>
            <input type="radio" name="pay" id="visa" />
          </li>
          <li>
            <label htmlFor="mastercard">
              {" "}
              <img src={master} alt="pay" />
              Master Card
            </label>
            <input type="radio" name="pay" id="mastercard" />
          </li>
        </ul>
        <button onClick={() => setConfirm((pre) => !pre)}>Pay Now</button>
      </div>
    </div>
  ) : (
    <div className="payment_con">
      <div className="image">
        <img src={invoice} alt="con" />
      </div>
      <h5>Payment Successful</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, ex fugit,
        quasi dolorum aliquam doloremque quae impedit quod a debitis veritatis
        nisi ullam officia magnam magni cum expedita et ipsa nam quo ratione
        corporis maxime culpa. Voluptate id animi dolorem rerum quod molestias
        sint maiores!
      </p>
      <button onClick={() => navigate("/home")}>Back to home</button>
    </div>
  );
}
export default Payment;
