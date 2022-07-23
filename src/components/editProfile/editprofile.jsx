import React from "react";
import getCroppedImg from "../../imageCrop";
import "./edit.scss";
import { AiOutlinePicture } from "react-icons/ai";
import { BsCamera } from "react-icons/bs";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { setCurrentUser } from "../../redux/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { updateuser } from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../loadingandnotification/loading";
import Info from "../info/info";
function EditProfile({ currentUser, setcurrentUser, update, loader }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [imageLink, setImage] = useState(null);
  const canvas = useRef();
  const video = useRef();
  const photo = useRef();
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    if (currentUser) {
      setUserDetail({
        ...currentUser,
      });
    }
  }, [currentUser, setcurrentUser]);
  const [upload, setUpload] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedArea] = useState(null);
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  async function done() {
    setUpload(false);
    const data = await getCroppedImg(imageLink, croppedAreaPixels);
    setUserDetail((pre) => ({
      ...pre,
      photoUrl: data,
    }));
  }
  function cancel() {
    setImage(currentUser.photoUrl);
    setUpload(false);
  }
  function images(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        setUpload(true);
      });
    }
  }
  function cancelPic() {
    stopStreamedVideo(video.current);
    setOpen(false);
  }
  function enterData(e) {
    setUserDetail((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }
  function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    videoElem.srcObject = null;
  }
  function take(ev) {
    var context = canvas.current.getContext("2d");
    var height = 350;
    var width = 350;
    if (height && width) {
      canvas.current.width = width;
      canvas.current.height = height;
      context.drawImage(video.current, 0, 0, width, height);
      var data = canvas.current.toDataURL("image/jpeg");
      setImage(data);
      setOpen(false);
      setUpload(true);
    } else {
      context = canvas.current.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.current.width, canvas.current.height);
      data = canvas.current.toDataURL("image/jpeg");
      setImage(data);
      setOpen(false);
    }
    stopStreamedVideo(video.current);
    ev.preventDefault();
  }
  async function updateDetails() {
    const details = { ...currentUser, ...userDetail };
    update(details);
  }
  function takeAPicture() {
    setOpen(true);
    var width = 320;
    var height = 0;
    var streaming = false;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.current.srcObject = stream;
        video.current.play();
      });
    video.current.addEventListener(
      "canplay",
      function () {
        if (!streaming) {
          height =
            video.current.videoHeight / (video.current.videoWidth / width);
          video.current.setAttribute("width", width);
          video.current.setAttribute("height", height);
          canvas.current.setAttribute("width", width);
          canvas.current.setAttribute("height", height);
          video.current.style.display = "block";
          streaming = true;
        }
      },
      false
    );
  }
  return (
    <div className="edit_section">
      <Info />
      <Loading inactive={loader} />
      <div className="cropper" style={{ display: !upload ? "none" : "block" }}>
        <Cropper
          image={imageLink}
          crop={crop}
          zoom={zoom}
          aspect={4 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div className="ok">
          <div className="done" onClick={done}>
            Done
          </div>
          <div className="cancel" onClick={cancel}>
            Cancel
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => navigate("/profile")}>{"<"}</button> Update
        Profile
      </div>
      <div className="image">
        <img src={userDetail.photoUrl} alt="user" />
        <div className="inputs">
          <label htmlFor="picture">
            <AiOutlinePicture className="icons_edit" />
          </label>
          <input type="file" accept="image/*" id="picture" onInput={images} />
          <BsCamera className="icons_edit" onClick={takeAPicture} />
        </div>
      </div>
      <div className="name">
        <div className="input_sec">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="eg: Jon Jam"
            value={userDetail.name}
            onInput={enterData}
          />
        </div>
        <div className="input_sec">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            placeholder="eg: jon23@gmail.com"
            value={userDetail.email}
            onInput={enterData}
          />
        </div>
      </div>
      <div className={open ? "video open" : "video"}>
        <video id="video" ref={video}></video>
        <div className="btn">
          <div className="capture" onClick={take}>
            capture
          </div>
          <div className="capture" onClick={cancelPic}>
            cancel
          </div>
        </div>
      </div>
      <canvas id="canvas" ref={canvas} style={{ display: "none" }}>
        <img id="photo" ref={photo} alt="user" />
      </canvas>
      <div className="save" onClick={updateDetails}>
        Save
      </div>
    </div>
  );
}
const maptostate = (state) => ({
  currentUser: state.user.currentUser,
  loader: state.user.loading,
});
const setState = (dispatch) => ({
  setcurrentUser: (state) => dispatch(setCurrentUser(state)),
  update: (detail) => dispatch(updateuser(detail)),
});
export default connect(maptostate, setState)(EditProfile);
