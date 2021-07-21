import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ServiceDetail.css";
import CategoryNavbar from "../layouts/CategoryNavbar";
import Navbar from "../layouts/Navbar";
function ServiceDetail() {
  let { category, id } = useParams();
  const [service, setService] = useState(null);
  const [user, setUser] = useState(null);
  const URL = `http://localhost:5000/service/${category}/${id}`;
  // const URL = `https://jasa-aja-backend.herokuapp.com/service/${category}/${id}`;

  useEffect(async () => {
    if (service === null) {
      try {
        const doc = await axios.get(URL);
        const data = doc.data.product[0];
        console.log(doc);
        setService({
          _id: data._id,
          category: data.category,
          description: data.description,
          dob: data.dob,
          experience: data.experience,
          isPromoted: data.isPromoted,
          rating: data.rating,
          servicePicture: data.servicePicture,
          username: data.username,
          whatsappNumber: data.whatsappNumber,
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (service !== null && user === null) {
      const URL_user = `http://localhost:5000/user/${service.username}`;
      // const URL_user = `https://jasa-aja-backend.herokuapp.com/user/${service.username}`;
      try {
        const doc = await axios.get(URL_user);
        const data = doc.data.user[0];
        console.log(doc);
        setUser({
          profilePicture: data.profilePicture,
          username: data.username,
          fullname: data.fullname,
          dob: data.dob,
        });
      } catch (e) {
        console.log(e);
      }
    }
    console.log(service);
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
  function promote() {
    console.log("clicked");
    const URL = "http://localhost:5000/service/promote";
    axios
      .post(URL, {
        serviceId: service._id,
      })
      .then((res) => {
        console.log(res);
        alert("Promoted");
      })
      .catch((e) => {
        console.log(e);
        alert("promote error");
      });
  }

  return (
    <div>
      <Navbar />
      <CategoryNavbar />
      {service !== null && user !== null && (
        <>
          <div className="detail-container">
            <img
              class="jasa-photo"
              // src={`https://jasa-aja-backend.herokuapp.com/images/${service.servicePicture}`}
              src={`http://localhost:5000/images/${service.servicePicture}`}
              alt="Foto Supir"
            />
            <div className="description">
              <a href={`http://localhost:3000/profil/${service.username}`}>
                {/* <a
                href={`https://jasakuy.herokuapp.com/profil/${service.username}`}
              > */}
                <div className="service-provider-profile">
                  <>
                    <img
                      src={`http://localhost:5000/images/uploads/userpp.png`}
                    />
                    {/* <img
                      src={`https://jasa-aja-backend.herokuapp.com/images/${user.profilePicture}`}
                    /> */}
                    <div className="detail">
                      <p>{user.fullname}</p>
                      <p>{getAge(user.dob)} tahun</p>
                      <p>{service.category}</p>
                    </div>
                  </>
                </div>
              </a>
              <div className="lime-background service-detail">
                {service.isPromoted ? (
                  <p>
                    <img src="http://localhost:5000/images/uploads/star.png"></img>
                  </p>
                ) : (
                  <p></p>
                )}
                Deskripsi: <br /> {service.description}
                <br />
                <br />
              </div>
            </div>
          </div>
          <div className="bottom">
            {service.username == user.username && !service.isPromoted ? (
              <a onClick={promote}>
                <div className="button-bottom">Promote Service</div>
              </a>
            ) : (
              <a href={`https://wa.me/${service.whatsappNumber}`}>
                <div className="button-bottom">Hubungi melalui whatsapp</div>
              </a>
            )}

            <a href={`/profil/${service.username}`}>
              <div className="button-bottom">Lihat Profil</div>
            </a>
            <a href={`/servis/${service.category}`}>
              <div className="button-bottom">
                Lihat jasa {service.category} lainnya
              </div>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ServiceDetail;
