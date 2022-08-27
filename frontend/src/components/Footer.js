import React from "react";
import "../styles/Footer.css";
import fbIcon from "../Images/facebook.png";
import igIcon from "../Images/instragram.png";
import twIcon from "../Images/twitter.png";
import piIcon from "../Images/pinterest.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__contact">
        <h2>Контакти</h2>
        <p>E-mail: mebelcity@gmail.com</p>
        <p>Од понеделник до сабота: 08:00 - 19:00</p>
        <p>Недела: 09:00 - 16:00</p>
        <p>Call Center: 0123456789 </p>
      </div>
      <div className="footer__social">
        <h2>Следете не</h2>
        <div className="socialIconText">
          <img alt="facebook" src={fbIcon}></img>
          <span>Facebook</span>
        </div>
        <div className="socialIconText">
          <img alt="instagram" src={igIcon}></img>
          <span>Instagram</span>
        </div>
        <div className="socialIconText">
          <img alt="twitter" src={twIcon}></img>
          <span>Twitter</span>
        </div>
        <div className="socialIconText">
          <img alt="pinterest" src={piIcon}></img>
          <span>Pinterest</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
