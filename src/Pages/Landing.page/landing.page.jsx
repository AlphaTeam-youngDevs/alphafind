import React, { useState } from "react";
import "./landing.page.scss";
import image from "../../images/first.png";
import second from "../../images/second.png";
import { motion } from "framer-motion";
import Form from "../../Pages/form/form";
import third from "../../images/third.png";
import SwiperCore, { Virtual } from "swiper";
import LandingPageComp from "../../components/landingpage/landingpage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect } from "react";
function LandingPage() {
  SwiperCore.use([Virtual]);
  const [oldUser, setoldUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [swiperRef, setSwiperRef] = useState(null);
  const [slider, changeSlider] = useState(1);
  const slideTo = (index) => {
    if (index === 4) setoldUser(true);
    swiperRef.slideTo(index - 1, 0);
  };
  const data = [
    {
      header: "find affordable accomodation",
      image: image,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, praesentium. Voluptate facilis optio ratione deserunt molestias laboriosam aliquid eum, debitis ex? Sequi, laborum iste quas ex ab rerum quaerat! Cum suscipit rerum reprehenderit. Illo.",
    },
    {
      header: "Rooms are near your school",
      image: second,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, praesentium. Voluptate facilis optio ratione deserunt molestias laboriosam aliquid eum, debitis ex? Sequi, laborum iste quas ex ab rerum quaerat! Cum suscipit rerum reprehenderit. Illo.",
    },
    {
      header: "Make payment and move in",
      image: third,
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, praesentium. Voluptate facilis optio ratione deserunt molestias laboriosam aliquid eum, debitis ex? Sequi, laborum iste quas ex ab rerum quaerat! Cum suscipit rerum reprehenderit. Illo.",
    },
  ].map((el, id) => {
    return (
      <SwiperSlide key={id}>
        <LandingPageComp {...el} />
      </SwiperSlide>
    );
  });
  const containerVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0, duration: 1.5 },
    },
    exit: {
      x: "-100vw",
      opacity: 0,
      transition: { ease: "easeIn" },
    },
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(oldUser));
  }, [oldUser]);
  return !oldUser ? (
    <motion.div
      className="land"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Swiper
        virtual
        onSwiper={setSwiperRef}
        slidesPerView={1}
        spaceBetween={30}
        onSlideResetTransitionEnd={() => {
          setoldUser(true);
        }}
        onSlidePrevTransitionEnd={() => changeSlider(slider - 1)}
        onSlideNextTransitionEnd={() => changeSlider(slider + 1)}
      >
        {data}
      </Swiper>
      <div className="togglebutton">
        <ul>
          <li
            onClick={() => {
              slideTo(1);
              changeSlider(1);
            }}
            className={slider === 1 ? "active" : ""}
          ></li>
          <li
            onClick={() => {
              slideTo(2);
              changeSlider(2);
            }}
            className={slider === 2 ? "active" : ""}
          ></li>
          <li
            onClick={() => {
              slideTo(3);
              changeSlider(3);
            }}
            className={slider === 3 ? "active" : ""}
          ></li>
        </ul>
        <div
          className="nextbutton"
          onClick={() => {
            slideTo(slider + 1);
            changeSlider(slider + 1);
          }}
        >
          {">"}
        </div>
      </div>
    </motion.div>
  ) : (
    <Form />
  );
}

export default LandingPage;
