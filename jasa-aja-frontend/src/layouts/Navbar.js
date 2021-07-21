import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userContext from "../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";
import logo from "../img/logo/logo2jasaajaPNG.png";
import "../App.css";
function Navbar() {
  const history = useHistory();
  const [user, setUser] = useContext(userContext);
  useEffect(() => {
    if (!user) {
      history.push("/masuk");
    }
  });
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    history.push("/masuk");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <a href="/">
          <img src={logo} style={{ height: "70px" }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <a className="nav-link mx-5" href="/beranda">
                Cari Jasa
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-5" href="/tawarkan">
                Tawarkan Jasa
              </a>
            </li>
            {/* <li className="nav-item mx-5">
              <a className="nav-link" href="#">
                Hubungi Kami
              </a>
            </li> */}
            <li className="nav-item dropdown ml-auto">
              <a
                style={{ marginLeft: "130px", marginTop: "0px" }}
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* <FontAwesomeIcon icon={faUser} style={{ fontSize: "30px" }} /> */}

                <img
                  className="profilePicture"
                  src={`http://localhost:5000/images/uploads/userpp.png`}
                  // src={`https://jasa-aja-backend.herokuapp.com/images/uploads/userpp.png`}
                />

                {/* <img
                    className="profilePicture"
                    src={`http://localhost:5000/images/${user.profilePicture}`}
                    // src={`https://jasa-aja-backend.herokuapp.com/images/${user.profilePicture}`}
                  /> */}

                {/* <img
                  className="profilePicture"
                  src={`http://localhost:5000/images/${user.profilePicture}`}
                /> */}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href={`/profil/${user.username}`}>
                  Profil
                </a>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
