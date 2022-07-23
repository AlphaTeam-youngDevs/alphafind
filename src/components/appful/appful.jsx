import React, { useState } from "react";
import { motion } from "framer-motion";
import "./appfull.scss";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import { connect, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { hall } from "../../halls/hall";
import { searchAction } from "../../redux/search/search.action";
import { useEffect } from "react";
function Appfull(prop) {
  const navigate = useNavigate();
  const search = useDispatch();
  const [searchRoom, setSearchRoom] = useState("");
  useEffect(() => {
    if (searchRoom.length === 0) {
      search(searchAction(null));
      return;
    }
    const searches = hall.filter(
      (el) =>
        el.name.toLocaleLowerCase().includes(searchRoom.toLocaleLowerCase()) ||
        el.location.toLocaleLowerCase().includes(searchRoom.toLocaleLowerCase())
    );
    search(searchAction(searches));
  }, [searchRoom, search]);
  function handleChange(el) {
    setSearchRoom(el.target.value);
  }
  const containerVariant = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: "0%",
      transition: { delay: 0.1, duration: 0.6 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { ease: "easeInOut" },
    },
  };
  return (
    <>
      <motion.div
        className="home"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="profile">
          <img
            src={prop.currentUser.photoUrl}
            alt="user"
            onClick={() => navigate("/profile")}
          />
          <div className="label">
            <span className="greeting">Welcome back</span>
            <span className="name">{prop.currentUser.name}</span>
          </div>
        </div>
        <div className="search">
          <div className="search-box">
            <BiSearch />
            <input
              type="text"
              placeholder="Search rooms"
              onChange={handleChange}
              value={searchRoom}
            />
          </div>
          <GoSettings
            className="GoSettings"
            onClick={() => navigate("/filter")}
          />
        </div>
        {!prop.search?.length ? (
          <>
            <span className="scroll">
              <div className="category">
                <span>Hostel</span>
                <span>Mostel</span>
              </div>
              <div className="suggestion">
                <div className="suggest">
                  <span>Suggestions for you</span>
                  <span
                    className="all"
                    onClick={() => search(searchAction(hall))}
                  >
                    See all{" >"}
                  </span>
                </div>

                <ul className="suggestList">
                  <Swiper spaceBetween={-190} slidesPerView={1}>
                    {hall.map((el) => {
                      return (
                        <SwiperSlide key={el.id}>
                          <li onClick={() => navigate(`/book/${el.id}`)}>
                            <div className="star">
                              {el.star} <AiFillStar className="stars" />{" "}
                            </div>
                            <img src={el.images[0]} alt="hostel" />
                            <div className="lower">
                              <div className="name">{el.name}</div>
                              <div className="location">
                                {" "}
                                <IoLocationOutline className="geo" />
                                <span>{el.location.slice(0, 5)}...</span>
                              </div>
                            </div>
                          </li>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </ul>
              </div>
              <div className="best">
                <h4>Best Offers</h4>
                {hall.map((el) => {
                  return (
                    <div className="best_card" key={el.id}>
                      <img src={el.images[0]} alt="cart" />
                      <div className="label">
                        <div className="name">{el.name.slice(0, 9)}</div>
                        <span>
                          <MdLocationOn /> {el.location.slice(0, 11)}...
                        </span>
                        <span>
                          <FaBed /> {el.numberInRoom} in 1
                        </span>
                        <span>
                          <GoPerson /> {el.numberLeft} left
                        </span>
                      </div>
                      <button onClick={() => navigate(`/book/${el.id}`)}>
                        Book Now
                      </button>
                    </div>
                  );
                })}
              </div>
            </span>
          </>
        ) : (
          <div className="searchResult">
            {prop.search.map((el) => {
              return (
                <div className="best_card" key={el.id}>
                  <img src={el.images[0]} alt="cart" />
                  <div className="label">
                    <div className="name">{el.name.slice(0, 9)}</div>
                    <span>
                      <MdLocationOn /> {el.location.slice(0, 11)}...
                    </span>
                    <span>
                      <FaBed /> {el.numberInRoom} in 1
                    </span>
                    <span>
                      <GoPerson /> {el.numberLeft} left
                    </span>
                  </div>
                  <button onClick={() => navigate(`/book/${el.id}`)}>
                    Book Now
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}
const maptostate = (state) => ({
  currentUser: state.user.currentUser,
  search: state.search.search,
});
export default connect(maptostate)(Appfull);
