import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Link, Switch, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Beranda from "./pages/Beranda";
import OfferService from "./pages/OfferService";
import ServicesByCategory from "./pages/ServicesByCategory";
import ProviderSignUp from "./pages/ProviderSignUp";
import ServiceDetail from "./pages/ServiceDetail";
import Profile from "./pages/Profile";
import "./App.css";
function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/masuk" component={Login} />
            <Route exact path="/daftar" component={SignUp} />
            <Route exact path="/beranda" component={Beranda} />
            <Route exact path="/tawarkan" component={OfferService} />
            <Route exact path="/daftar-jasa" component={ProviderSignUp} />
            <Route exact path="/profil/:username" component={Profile} />
            <Route path="/servis/:category/:id" component={ServiceDetail} />
            <Route path="/servis/:category" component={ServicesByCategory} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
