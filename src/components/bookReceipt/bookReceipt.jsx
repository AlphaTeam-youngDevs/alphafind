import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import image from "../../images/download.png";
import { useNavigate } from "react-router-dom";
import "./bookReceipt.scss";
import { useRef } from "react";
import { FiShare } from "react-icons/fi";
function Receipt() {
  const navigate = useNavigate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const pdf = useRef();
  function converToPDF() {
    const html = pdf.current.innerHTML;
    var printWindow = window.open("", "", "height=400,width=800");
    printWindow.document.write("<html><head><title>Receipt</title>");
    printWindow.document.write("</head><body >");
    printWindow.document.write(html);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  }
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
    <span>
      <div className="bookConfirm">
        <div id="ignore" className="con_btn">
          <button onClick={() => navigate(`/home`)}>{"<"}</button> Booking receipt{" "}
          <FiShare onClick={converToPDF} style={{cursor: "pointer"}}/>
        </div>
        <div className="body-confirm" ref={pdf}>
          <div className="top">
            <span>
              <img src={image} alt="hall" />
            </span>{" "}
            <div className="label">
              <h3>Nkrumah</h3>
              <div className="location">
                <span>
                  <MdLocationOn /> Kumasi
                </span>
                <span>
                  <FaBed />3 in 1
                </span>
              </div>
            </div>
          </div>
          <div className="des">
            <h5>Description</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              autem id alias distinctio illum sequi, suscipit, maxime quaerat
              libero tempora repellat aperiam labore totam, reiciendis velit
              temporibus doloremque impedit facilis qui vero cumque numquam.
            </p>
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
              <div className="label_student">Name</div> Kwame
            </span>
            <span>
              <div className="label_student">Email</div> sam234@hgl.vom
            </span>
          </div>
          <div className="bottom_conf">
            <div className="payment_info">
              <h3>Payment Information</h3>
              <div>
                Paid Via <span>M.T.N mobile money</span>
              </div>
              <div>
                Paid By <span>Kwame</span>
              </div>
              <div>
                Total Amount<span>GHS 1000/sem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
export default Receipt;
