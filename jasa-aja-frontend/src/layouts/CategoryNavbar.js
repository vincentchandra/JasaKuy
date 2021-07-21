import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategoryNavbar.css";
function CategoryNavbar() {
  return (
    <div>
      <div class="lower-nav-bar">
        <div class="lower-nav-bar-buttons">
          <a style={{ marginLeft: "25px;" }} href="/servis/supir">
            Supir
          </a>
        </div>
        <div class="lower-nav-bar-buttons">
          <a href="/servis/tukang">Tukang</a>
        </div>
        <div class="lower-nav-bar-buttons">
          <a href="/servis/koki">Koki</a>
        </div>
        <div class="lower-nav-bar-buttons">
          <a href="/servis/pembantu"> Pembantu</a>
        </div>
        <div class="lower-nav-bar-buttons">
          <a href="/servis/pengasuh">Pengasuh</a>
        </div>
      </div>
    </div>
  );
}

export default CategoryNavbar;
