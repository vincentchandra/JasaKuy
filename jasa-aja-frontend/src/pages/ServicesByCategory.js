import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import CategoryNavbar from "../layouts/CategoryNavbar";
import "../styles/ServicesByCategory.css";
import userContext from "../context/UserContext";
function ServicesByCategory() {
  const [user, setUser] = useContext(userContext);
  console.log(user);
  const history = useHistory();

  let { category } = useParams();
  const [services, setServices] = useState(null);
  // const URL = `https://jasa-aja-backend.herokuapp.com/service/${category}`;
  const URL = `http://localhost:5000/service/${category}`;
  useEffect(async () => {
    if (!user) {
      history.push("/masuk");
    }
    if (services === null) {
      try {
        const doc = await axios.get(URL);
        console.log(doc.data.product);
        setServices(
          doc.data.product.map((el) => {
            return {
              _id: el._id,
              category: el.category,
              description: el.description,
              experience: el.experience,
              isPromoted: el.isPromoted,
              rating: el.rating,
              servicePicture: el.servicePicture,
              username: el.username,
              whatsappNumber: el.whatsappNumber,
              rating: el.rating,
              dob: el.dob,
            };
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
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
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <div class="list-jasa">
        <Navbar />
        <CategoryNavbar />
        <div class="services-type-header">
          {capitalizeFirstLetter(category)}
        </div>

        <div class="content">
          <div class="content-items row  ">
            {services !== null &&
              services.length > 0 &&
              services.map((service) => {
                console.log(service);
                return (
                  <>
                    <div class="content-item col-sm-12 col-md-6 col-lg-3 col-xl-3 py-3">
                      {service.isPromoted ? (
                        <div className="star">
                          <img src="http://localhost:5000/images/uploads/star.png"></img>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      <a href={`/servis/${category}/${service._id}`}>
                        <img
                          class="content-image"
                          src={`http://localhost:5000/images/${service.servicePicture}`}
                          alt=""
                        />
                      </a>

                      <div class="content-details">
                        <p>{service.username}</p>
                        <p>{getAge(service.dob)} tahun</p>
                        <p>Pengalaman: {service.experience} tahun</p>
                        {/* <p>
                          {" "}
                          &#11088;:{" "}
                          {service.rating === 0 ? "-" : service.rating}
                          /5
                        </p> */}
                      </div>
                    </div>
                  </>
                );
              })}
            {services !== null && services.length === 0 && (
              <div className="empty">
                <p>Tidak ada {category} yang tersedia</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesByCategory;
