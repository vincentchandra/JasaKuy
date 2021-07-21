import React, { useContext, useState, useEffect } from "react";
import userContext from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import Navbar from "../layouts/Navbar";
import logo from "../img/logo/logo2jasaajaPNG.png";
function Login() {
  const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  // const URL = "https://jasa-aja-backend.herokuapp.com/user/login";
  const URL = "http://localhost:5000/user/login";
  const [user, setUser] = useContext(userContext);
  const history = useHistory();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (user) {
      history.push("/beranda");
    }
  });
  const handleLogin = (event) => {
    console.log("clicked");
    event.preventDefault();
    axios
      .post(URL, {
        email: input.email,
        password: input.password,
      })
      .then((res) => {
        console.log(res.data.user);
        setUser({
          _id: res.data.user._id,
          email: res.data.user.email,
          username: res.data.user.username,
          whatsappNumber: res.data.user.whatsappNumber,
          fullname: res.data.user.fullname,
          profilePicture: res.data.user.profilePicture,
          dob: res.data.user.dob,
          role: res.data.user.role,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data.user.id,
            email: res.data.user.email,
            username: res.data.user.username,
            whatsappNumber: res.data.user.whatsappNumber,
            fullname: res.data.user.fullname,
            profilePicture: res.data.user.profilePicture,
            dob: res.data.user.dob,
            role: res.data.user.role,
          })
        );
        setInput({ username: "", password: "" });
        alert("Login Berhasil!");
        history.push("/beranda");
      })
      .catch((e) => {
        console.log("Error Login: \n" + e);
        alert("Salah username atau password");
      });
  };
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "email": {
        setInput({ ...input, email: value });
        break;
      }
      case "password": {
        setInput({ ...input, password: value });
        break;
      }
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
                <form onSubmit={handleLogin}>
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
                      placeholder="Masukkan password anda"
                    />{" "}
                  </div>
                  <div className="row mb-4 px-3">
                    {" "}
                    <small className="font-weight-bold">
                      Belum punya akun?{" "}
                      <Link
                        style={{ color: "#54ffad !important ;" }}
                        className="text-info"
                        to="/daftar"
                      >
                        Daftar
                      </Link>
                    </small>{" "}
                  </div>
                  <div className="row mb-3 px-3">
                    {" "}
                    <button type="submit" className="btn btn-blue text-center">
                      Masuk
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

export default Login;
