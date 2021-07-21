import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import "../styles/Profile.css";
function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState(null);
  useEffect(async () => {
    if (user === null) {
      try {
        const doc = await axios.get(`http://localhost:5000/user/${username}`);
        // const doc = await axios.get(
        //   `https://jasa-aja-backend.herokuapp.com/user/${username}`
        // );
        console.log(doc.data.user[0]);
        setUser({
          fullname: doc.data.user[0].fullname,
          dob: doc.data.user[0].dob,
          role: doc.data.user[0].role,
          whatsappNumber: doc.data.user[0].whatsappNumber,
          profilePicture: doc.data.user[0].profilePicture,
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (services === null) {
      try {
        const doc = await axios.get(
          `http://localhost:5000/user/${username}/services`
        );
        // const doc = await axios.get(
        //   `https://jasa-aja-backend.herokuapp.com/user/${username}/services`
        // );
        setServices(
          doc.data.services.map((el) => {
            return {
              _id: el._id,
              category: el.category,
              servicePicture: el.servicePicture,
              experience: el.experience,
              rating: el.rating,
              description: el.description,
            };
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
    console.log(services);
  });
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return (
    <div>
      <Navbar />
      {user !== null && (
        <div className="profile">
          {user.role == "pelanggan" ? (
            <>
              <img src={`http://localhost:5000/images/uploads/userpp.png`} />
              {/* <img
                src={`https://jasa-aja-backend.herokuapp.com/images/uploads/userpp.png`}
              /> */}
              <div className="description">
                <p>Nama: {user.fullname}</p>
                <p>Peran: Pelanggan</p>
              </div>
            </>
          ) : (
            <>
              <img
                src={`http://localhost:5000/images/uploads/userpp.png`}
                // src={`https://jasa-aja-backend.herokuapp.com/images/${user.profilePicture}`}
              />
              <div className="description">
                <p>Nama: {user.fullname}</p>
                <p>Umur: {getAge(user.dob)} tahun</p>
                <p>Peran: Penawar Jasa</p>
                <p>Whatsapp: {user.whatsappNumber}</p>
              </div>
            </>
          )}
        </div>
      )}
      <hr style={{ width: "80%" }} />
      <br />
      {services !== null &&
        services.map((service) => {
          return (
            <>
              <a href={`/servis/${service.category}/${service._id}`}>
                <div className="service">
                  {/* <img
                    src={`https://jasa-aja-backend.herokuapp.com/images/${service.servicePicture}`}
                  /> */}
                  <img
                    src={`http://localhost:5000/images/${service.servicePicture}`}
                  />

                  <div className="description">
                    <h3>{service.category}</h3>
                    <p>Pengalaman: {service.experience} tahun</p>
                    <p>Rating: {service.rating}/5</p>
                    <p>Deskripsi: {service.description}</p>
                  </div>
                </div>
              </a>
            </>
          );
        })}
    </div>
  );
}

export default Profile;
