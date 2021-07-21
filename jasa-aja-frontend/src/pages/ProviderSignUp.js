import React, { useContext, useState, useEffect } from "react";
import userContext from "../context/UserContext";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../img/logo/logo2jasaajaPNG.png";
import "react-phone-input-2/lib/style.css";
import "../styles/Login.css";
import CategoryNavbar from "../layouts/CategoryNavbar";

function ProviderSignUp() {
  const [user, setUser] = useContext(userContext);
  const history = useHistory();
  const [input, setInput] = useState({
    whatsappNumber: "62",
    ktpNumber: "",
    profilePicture: "",
    dob: null,
  });
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    if (user.role == "penawar") {
      history.push("/tawarkan");
    }
  });
  const URL = "http://localhost:5000/user/provider-signup";
  // const URL = "https://jasa-aja-backend.herokuapp.com/user/provider-signup";
  const handleSignUp = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("email", user.email);
    form_data.append("whatsappNumber", input.whatsappNumber);
    form_data.append("ktpNumber", input.ktpNumber);
    form_data.append(
      "profilePicture",
      input.profilePicture,
      input.profilePicture.name
    );
    let date = new Date(value.setDate(value.getDate() + 1));
    form_data.append("dob", date);
    axios
      .post(URL, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setUser({
          email: res.data.user.email,
          _id: res.data.user._id,
          username: res.data.user.username,
          whatsappNumber: res.data.user.whatsappNumber,
          ktpNumber: res.data.user.ktpNumber,
          fullname: res.data.user.fullname,
          profilePicture: res.data.user.profilePicture,
          dob: res.data.user.dob,
          role: res.data.user.role,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data.user._id,
            username: res.data.user.username,
            whatsappNumber: res.data.user.whatsappNumber,
            ktpNumber: res.data.user.ktpNumber,
            fullname: res.data.user.fullname,
            email: res.data.user.email,
            profilePicture: res.data.user.profilePicture,
            dob: res.data.user.dob,
            role: res.data.user.role,
          })
        );
        setInput({});
        alert("You are registered as service provider!");
        history.push("/tawarkan");
      })
      .catch((e) => {
        console.log(e);
        alert("Complete all forms!");
      });
  };
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "whatsappNumber": {
        setInput({ ...input, whatsappNumber: value });
        break;
      }
      case "ktpNumber": {
        setInput({ ...input, ktpNumber: value });
        break;
      }
      case "profilePicture": {
        setInput({ ...input, profilePicture: event.target.files[0] });
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div>
      <Navbar />
      <CategoryNavbar />
      <div className=" container container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <h1 className="Title">Daftar sebagai penawar jasa</h1>
        <div className=" card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  {" "}
                  <img src={logo} className="logo" />{" "}
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {" "}
                  <img
                    src="https://i.imgur.com/uNGdWHi.png"
                    className="image"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
                <form onSubmit={handleSignUp}>
                  <br />

                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Nomor Whatsapp</h6>
                    </label>{" "}
                    <input
                      className="mb-4"
                      type="number"
                      name="whatsappNumber"
                      onChange={handleChange}
                      value={input.whatsappNumber}
                      placeholder="Masukkan nomor whatsapp baru"
                      required
                    />{" "}
                  </div>
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Nomor KTP</h6>
                    </label>{" "}
                    <input
                      className="mb-4"
                      type="number"
                      name="ktpNumber"
                      onChange={handleChange}
                      value={input.ktpNumber}
                      placeholder="Masukkan nomor KTP"
                      required
                    />{" "}
                  </div>
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Foto Selfie dengan KTP</h6>
                    </label>{" "}
                    <input
                      className="mb-4"
                      type="file"
                      name="profilePicture"
                      id="profilePicture"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleChange}
                      required
                    />{" "}
                  </div>
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1 mr-3">
                      <h6 className="mb-0 text-sm">Tanggal Lahir</h6>
                    </label>{" "}
                    <DatePicker onChange={onChange} value={value} />
                  </div>
                  <br />

                  <br />
                  <br />
                  <div className="row mb-3 px-3">
                    {" "}
                    <button type="submit" className="btn btn-blue text-center">
                      Daftar sebagai penawar
                    </button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-blue py-4">
            <div className="row px-3">
              {" "}
              <small className="ml-4 ml-sm-5 mb-2">
                &copy; JasaAja 2021. All rights reserved.
              </small>
              <div className="social-contact ml-4 ml-sm-auto">
                {" "}
                <span className="fa fa-facebook mr-4 text-sm"></span>{" "}
                <span className="fa fa-google-plus mr-4 text-sm"></span>{" "}
                <span className="fa fa-linkedin mr-4 text-sm"></span>{" "}
                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderSignUp;
