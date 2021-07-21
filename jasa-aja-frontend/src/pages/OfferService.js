import React, { useContext, useState, useEffect } from "react";
import userContext from "../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../styles/OfferService.css";
import Navbar from "../layouts/Navbar";
function OfferService() {
  const [user, setUser] = useContext(userContext);
  const history = useHistory();
  const [input, setInput] = useState({
    category: "tukang",
    experiences: "",
    description: "",
    servicePicture: null,
  });
  useEffect(() => {
    if (user.role == "pelanggan") {
      history.push("/daftar-jasa");
    }
  });
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "category": {
        console.log(value);
        setInput({ ...input, category: value });
        break;
      }
      case "experiences": {
        setInput({ ...input, experiences: value });
        break;
      }
      case "description": {
        setInput({ ...input, description: value });
        break;
      }
      case "servicePicture": {
        setInput({ ...input, servicePicture: event.target.files[0] });
        break;
      }
      default: {
        break;
      }
    }
  };
  const URL = "http://localhost:5000/service/create";
  // const URL = "https://jasa-aja-backend.herokuapp.com/service/create";
  const handleOfferService = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("username", user.username);
    form_data.append("description", input.description);
    form_data.append("category", input.category);
    form_data.append(
      "servicePicture",
      input.servicePicture,
      input.servicePicture.name
    );
    form_data.append("experience", input.experiences);
    form_data.append("whatsappNumber", user.whatsappNumber);
    form_data.append("dob", user.dob);
    axios
      .post(URL, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setInput({
          description: "",
          experiences: "",
        });
        alert("Service Created!");
        history.push("/beranda");
      })
      .catch((e) => {
        console.log(e);
        alert("Error occured!");
      });
  };
  return (
    <div>
      <Navbar />
      <div className="title">
        <h1>Daftarkan jasa anda</h1>
      </div>
      <div className="form">
        <form onSubmit={handleOfferService}>
          <select
            className="input form-control form-control-lg"
            name="category"
            value={input.category}
            onChange={handleChange}
          >
            {/* <option value="" disabled selected hidden>
              Pilih Pekerjaan...
            </option> */}
            <option value="tukang">Tukang</option>
            <option value="pembantu">Pembantu</option>
            <option value="koki">Koki</option>
            <option value="supir">Supir</option>
            <option value="pengasuh">Pengasuh</option>
          </select>
          <input
            type="number"
            className="input"
            placeholder="Pengalaman(tahun)..."
            name="experiences"
            onChange={handleChange}
            value={input.experiences}
          />
          <textarea
            rows="6"
            type="text"
            className="input"
            placeholder="Deskripsi..."
            name="description"
            onChange={handleChange}
            value={input.description}
          />
          <label className="input" style={{ marginBottom: "0px" }}>
            Choose a picture for your service:
          </label>
          <input
            className="input mb-4"
            placeholder="Deskripsi..."
            type="file"
            name="servicePicture"
            id="servicePicture"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleChange}
            required
          />{" "}
          <input type="submit" className="submit" value="Kirim" />
        </form>
      </div>
    </div>
  );
}

export default OfferService;
