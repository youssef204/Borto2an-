import React from "react";
import "./Footer.css";
import NewsComponent from "./NewsComponent";

function Footer() {
  return (
    <>
      <footer class="mainFooter">
        <div class="waves">
          <div class="wave" id="wave1"></div>
          <div class="wave" id="wave2"></div>
          <div class="wave" id="wave3"></div>
          <div class="wave" id="wave4"></div>
        </div>
        <div className="gradientColor"></div>
        <NewsComponent title="Popular Trips" />
        <NewsComponent title="On Sell Trips" />
        <div className="FooterText">
          <div class="contributors">Contributors</div>
          <ul class="menu">
            <li class="menu__item">
              <a
                class="menu__link"
                href="https://github.com/HeshamMoneer"
                target="_blank"
              >
                Hesham Moneer
              </a>
            </li>
            <li class="menu__item">
              <a
                class="menu__link"
                href="https://github.com/PeterFahmi"
                target="_blank"
              >
                Peter Fahmi
              </a>
            </li>
            <li class="menu__item">
              <a
                class="menu__link"
                href="https://github.com/mohamedeshiba"
                target="_blank"
              >
                Mohamed Eshiba
              </a>
            </li>
            <li class="menu__item">
              <a
                class="menu__link"
                href="https://github.com/omarkhair"
                target="_blank"
              >
                Omar Khair
              </a>
            </li>
            <li class="menu__item">
              <a
                class="menu__link"
                href="https://github.com/youssef204"
                target="_blank"
              >
                Youssef Amin
              </a>
            </li>
          </ul>
          <p>&copy;2022 Borto2an | All Rights Reserved</p>
        </div>
      </footer>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </>
  );
}

export default Footer;
