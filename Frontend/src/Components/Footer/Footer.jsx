import React from "react";
import "./Footer.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <IoAirplane className="logo-icon" />
              <span>SkyWings</span>
            </div>
            <p className="brand-slogan">Ufkun ötesine yolculuk</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h4 className="column-title">Hakkımızda</h4>
              <p className="column-text">30 yılı aşkın deneyimimizle dünyanın dört bir yanına kaliteli hizmet anlayışıyla uçuyoruz.</p>
              <div className="newsletter">
                <input type="email" placeholder="E-posta adresiniz" />
                <button>Abone Ol</button>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="column-title">Hizmetler</h4>
              <ul className="footer-links">
                <li><a href="#">Otopark & Vale</a></li>
                <li><a href="#">Yemek Hizmetleri</a></li>
                <li><a href="#">Duty-Free Alışveriş</a></li>
                <li><a href="#">Premium Lounge</a></li>
                <li><a href="#">Ulaşım Hizmetleri</a></li>
                <li><a href="#">WiFi Erişimi</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="column-title">Hızlı Linkler</h4>
              <ul className="footer-links">
                <li><a href="#">Uçuşlar</a></li>
                <li><a href="#">Kampanyalar</a></li>
                <li><a href="#">Seyahat Kuralları</a></li>
                <li><a href="#">Sık Sorulan Sorular</a></li>
                <li><a href="#">Gizlilik Politikası</a></li>
                <li><a href="#">Çerez Politikası</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="column-title">İletişim</h4>
              <ul className="contact-info">
                <li>
                  <FaPhone className="contact-icon" />
                  <span>+90 555 123 45 67</span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <span>info@skywings.com</span>
                </li>
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>İstanbul Havalimanı, Terminal C Blok No:45, 34283, Türkiye</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="payment-methods">
            <span>Ödeme Yöntemleri:</span>
            <div className="payment-icons">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" />
              <img src="https://cdn-icons-png.flaticon.com/512/825/825454.png" alt="PayPal" />
              <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" alt="Apple Pay" />
            </div>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} SkyWings Havayolları. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;