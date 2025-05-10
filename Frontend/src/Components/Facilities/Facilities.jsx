import React from "react";
import "./Facilities.css";

const services = [
  { 
    title: "Otopark ve Vale", 
    icon: "🅿️",
    description: "Güvenli ve konforlu otopark hizmeti ile valet park seçeneği" 
  },
  { 
    title: "Yemek", 
    icon: "🍴",
    description: "Uçuş öncesi ve sonrası lezzetli yemek seçenekleri" 
  },
  { 
    title: "Alışveriş", 
    icon: "🛍️",
    description: "Duty-free dahil geniş alışveriş olanakları" 
  },
  { 
    title: "İnternet", 
    icon: "🌐",
    description: "Hızlı ve ücretsiz WiFi erişimi tüm terminalde" 
  },
  { 
    title: "Ulaşım", 
    icon: "🚍",
    description: "Havalimanı transfer ve şehir ulaşım seçenekleri" 
  }
];

const Facilities = () => {
  return (
    <section className="facilities-section">
      <div className="facilities-container">
        <h2 className="facilities-title">Uçuş Deneyiminizi Zenginleştiren Hizmetler</h2>
        <p className="facilities-subtitle">Havalimanımızda sunduğumuz premium hizmetlerle seyahatinizi unutulmaz kılıyoruz</p>
        
        <div className="cards-wrapper">
          {services.map((service, index) => (
            <div key={index} className="facility-card">
              <div className="card-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
              <div className="card-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;