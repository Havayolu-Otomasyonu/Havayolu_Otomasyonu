import React from "react";
import "./Contact.css";
import foto1 from "./assets/havayolu1.jpg";
import foto2 from "./assets/havayolu2.jpg";
import foto3 from "./assets/havayolu3.jpg";
import foto4 from "./assets/havayolu4.jpg";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaFacebook } from "react-icons/fa";

const Contact = () => {
  const socialMedia = [
    { icon: <FaInstagram size={24} />, name: "Instagram", url: "#" },
    { icon: <FaTwitter size={24} />, name: "Twitter", url: "#" },
    { icon: <FaFacebook size={24} />, name: "Facebook", url: "#" },
    { icon: <FaLinkedin size={24} />, name: "LinkedIn", url: "#" },
    { icon: <FaYoutube size={24} />, name: "YouTube", url: "#" }
  ];

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">SkyWings ile Bağlantıda Kalın</h2>
          <p className="contact-subtitle">Seyahat deneyimlerinizi paylaşın ve en yeni kampanyalardan haberdar olun</p>
        </div>

        <div className="social-media-wrapper">
          {socialMedia.map((platform, index) => (
            <a 
              key={index} 
              href={platform.url} 
              className="social-icon"
              aria-label={`SkyWings ${platform.name} sayfası`}
            >
              <div className="icon-container">
                {platform.icon}
              </div>
              <span>{platform.name}</span>
            </a>
          ))}
        </div>

        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={foto1} alt="SkyWings uçuş deneyimi" className="gallery-image" />
            <div className="image-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src={foto2} alt="SkyWings kabin içi" className="gallery-image" />
            <div className="image-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src={foto3} alt="SkyWings uçağı" className="gallery-image" />
            <div className="image-overlay"></div>
          </div>
          <div className="gallery-item">
            <img src={foto4} alt="SkyWings personeli" className="gallery-image" />
            <div className="image-overlay"></div>
          </div>
        </div>

        <div className="hashtag-container">
          <p>#SkyWingsExperience</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;