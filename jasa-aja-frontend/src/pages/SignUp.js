import React, { useContext, useState, useEffect } from "react";
import userContext from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../img/logo/logo2jasaajaPNG.png";
import "react-phone-input-2/lib/style.css";
import "../styles/Login.css";
function SignUp() {
  const [user, setUser] = useContext(userContext);
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    // whatsappNumber: "62",
    // fullname: "",
    // profilePicture: null,
  });
  // const [value, onChange] = useState(new Date());
  useEffect(() => {
    if (user) {
      history.push("/beranda");
    }
  });
  const URL = "http://localhost:5000/user/signup";
  // const URL = "https://jasa-aja-backend.herokuapp.com/user/signup";
  const handleSignUp = (event) => {
    // if (input.whatsappNumber.substr(0, 2) !== "02") {
    //   alert("input a valid whatsappNumber");
    //   return;
    // }
    event.preventDefault();
    if (input.password != input.confirmPassword) {
      alert("Password and confirmation password don't matched");
      return;
    }
    let form_data = new FormData();
    form_data.append("email", input.email);
    form_data.append("username", input.username);
    form_data.append("password", input.password);
    // form_data.append("whatsappNumber", input.whatsappNumber);
    form_data.append("fullname", input.fullname);
    // form_data.append(
    //   "profilePicture",
    //   input.profilePicture,
    //   input.profilePicture.name
    // );
    // console.log(input.profilePicture.name);
    // let date = new Date(value.setDate(value.getDate() + 1));
    // form_data.append("dob", date);
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
          // whatsappNumber: res.data.user.whatsappNumber,
          fullname: res.data.user.fullname,
          // profilePicture: res.data.user.profilePicture,
          // dob: res.data.user.dob,
          role: res.data.user.role,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data.user._id,
            username: res.data.user.username,
            // whatsappNumber: res.data.user.whatsappNumber,
            fullname: res.data.user.fullname,
            email: res.data.user.email,
            // profilePicture: res.data.user.profilePicture,
            // dob: res.data.user.dob,
            role: res.data.user.role,
          })
        );
        setInput({
          fullname: "",
          username: "",
          password: "",
          email: "",
          confirmPassword: "",
        });
        alert("Account Created!");
        history.push("/beranda");
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
      case "username": {
        setInput({ ...input, username: value });
        break;
      }
      case "email": {
        setInput({ ...input, email: value });
        break;
      }
      case "fullname": {
        setInput({ ...input, fullname: value });
        break;
      }
      case "password": {
        setInput({ ...input, password: value });
        break;
      }
      case "confirmPassword": {
        setInput({ ...input, confirmPassword: value });
        break;
      }
      // case "whatsappNumber": {
      //   setInput({ ...input, whatsappNumber: value });
      //   break;
      // }
      // case "profilePicture": {
      //   setInput({ ...input, profilePicture: event.target.files[0] });
      //   break;
      // }
      default: {
        break;
      }
    }
  };
  return (
    <div>
      <div className="container container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
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
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Email</h6>
                    </label>{" "}
                    <input
                      autocomplete="off"
                      className="mb-4"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={input.email}
                      placeholder="Masukkan email anda"
                      required
                    />{" "}
                  </div>
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Username</h6>
                    </label>{" "}
                    <input
                      autocomplete="off"
                      className="mb-4"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={input.username}
                      placeholder="Masukkan username baru"
                      required
                    />{" "}
                  </div>
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Nama Lengkap</h6>
                    </label>{" "}
                    <input
                      autocomplete="off"
                      className="mb-4"
                      type="text"
                      name="fullname"
                      onChange={handleChange}
                      value={input.fullname}
                      placeholder="Masukkan nama lengkap anda"
                      required
                    />{" "}
                  </div>
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Password</h6>
                    </label>{" "}
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={input.password}
                      placeholder="Masukkan password baru"
                      required
                    />{" "}
                  </div>
                  <br />
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Konfirmasi Password</h6>
                    </label>{" "}
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={input.confirmPassword}
                      placeholder="Konfirmasi password baru"
                      required
                    />{" "}
                  </div>
                  <br />
                  {/* <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Nama Lengkap</h6>
                    </label>{" "}
                    <input
                      autocomplete="off"
                      className="mb-4"
                      type="text"
                      name="fullname"
                      onChange={handleChange}
                      value={input.fullname}
                      placeholder="Masukkan nama lengkap anda"
                      required
                    />{" "}
                  </div>
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

                  <br />
                  <div className="row px-3">
                    {" "}
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Foto Profil</h6>
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
                  </div> */}
                  <br />
                  <div className="row mb-4 px-3">
                    {" "}
                    <small className="font-weight-bold">
                      Sudah punya akun?{" "}
                      <Link className="text-info" to="/masuk">
                        Masuk
                      </Link>
                    </small>{" "}
                  </div>
                  <br />
                  <br />
                  <div className="row mb-3 px-3">
                    {" "}
                    <button type="submit" className="btn btn-blue text-center">
                      Daftar
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

export default SignUp;
