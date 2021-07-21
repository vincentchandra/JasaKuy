import React, { useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import userContext from "../context/UserContext";
import "../styles/Beranda.css";
import { Button } from "bootstrap";

function Home() {
  const [user, setUser] = useContext(userContext);
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/masuk");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="parent driver">
        <div className="child">
          <p>Para supir siap mengantarkan anda</p>
          <div className="button">
            <Link className="btn btn-blue text-center" to="/servis/supir">
              Cari tahu lebih lanjut
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="parent tukang">
        <div className="child">
          <p>Para tukang siap mengerjakan masalah rumah anda</p>
          <div className="button">
            <Link className="btn btn-blue text-center" to="/servis/tukang">
              Cari tahu lebih lanjut
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="parent koki">
        <div className="child">
          <p>Para koki siap memasak untuk kebutuhan anda</p>
          <div className="button">
            <Link className="btn btn-blue text-center" to="/servis/koki">
              Cari tahu lebih lanjut
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="parent pembantu">
        <div className="child">
          <p>Para pembantu siap mengerjakan pekerjaan rumah tangga anda</p>
          <div className="button">
            <Link className="btn btn-blue text-center" to="/servis/pembantu">
              Cari tahu lebih lanjut
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="parent pengasuh">
        <div className="child">
          <p>Para pengasuh siap mengerjakan pekerjaan rumah tangga anda</p>
          <div className="button">
            <Link className="btn btn-blue text-center" to="/servis/pengasuh">
              Cari tahu lebih lanjut
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
