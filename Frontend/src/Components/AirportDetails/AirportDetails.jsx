import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiMapPin, FiGlobe, FiNavigation, FiInfo, FiClock, FiWind } from "react-icons/fi";
import { MdOutlineRunCircle, MdAirplanemodeActive } from "react-icons/md";
import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";
import styles from "./AirportDetails.module.css";

const AirportDetails = () => {
  const { airportCode } = useParams();
  const [airportDetails, setAirportDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // API çağrısını simüle etme (demo amacıyla)
    const fetchData = async () => {
      try {
        setLoading(true);
        // Gerçek bir uygulamada gerçek API uç noktasını kullanmalısınız
        const response = await fetch(`http://localhost:8081/airports/${airportCode}`);
        const data = await response.json();
        setAirportDetails(data);
      } catch (error) {
        console.error("Havaalanı bilgileri alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [airportCode]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Havaalanı bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (!airportDetails) {
    return (
      <div className={styles.errorContainer}>
        <h2>Havaalanı Bulunamadı</h2>
        <p>{airportCode} koduna sahip havaalanı bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Başlık Bölümü */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.airportCode}>{airportDetails.AirportCode}</div>
          <h1 className={styles.title}>{airportDetails.AirportName}</h1>
          <div className={styles.location}>
            <FiMapPin className={styles.icon} />
            <span>
              {airportDetails.City}, {airportDetails.Country}
            </span>
          </div>
        </div>
      </div>

      {/* İstatistik Çubuğu */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <FiGlobe className={styles.statIcon} />
          <div>
            <span className={styles.statLabel}>Koordinatlar</span>
            <span className={styles.statValue}>
              {airportDetails.Latitude}, {airportDetails.Longitude}
            </span>
          </div>
        </div>
        <div className={styles.statItem}>
          <FiClock className={styles.statIcon} />
          <div>
            <span className={styles.statLabel}>Zaman Dilimi</span>
            <span className={styles.statValue}>{airportDetails.Timezone || "UTC"}</span>
          </div>
        </div>
        <div className={styles.statItem}>
          <MdAirplanemodeActive className={styles.statIcon} />
          <div>
            <span className={styles.statLabel}>Yükseklik</span>
            <span className={styles.statValue}>{airportDetails.Elevation || "Bilinmiyor"} ft</span>
          </div>
        </div>
      </div>

      {/* Sekme Navigasyonu */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "overview" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Genel Bakış
        </button>
        <button
          className={`${styles.tab} ${activeTab === "runways" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("runways")}
        >
          Pistler
        </button>
        <button
          className={`${styles.tab} ${activeTab === "services" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("services")}
        >
          Hizmetler
        </button>
        <button
          className={`${styles.tab} ${activeTab === "weather" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("weather")}
        >
          Hava Durumu
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className={styles.content}>
        {activeTab === "overview" && (
          <div className={styles.overview}>
            <div className={styles.overviewCard}>
              <h3 className={styles.cardTitle}>Bu Havaalanı Hakkında</h3>
              <p className={styles.cardText}>
                {airportDetails.Description ||
                  `${airportDetails.AirportName} bir ${airportDetails.Type || "kamusal"} havaalanıdır ve ${airportDetails.City} ile çevresindeki bölgelere hizmet vermektedir.`}
              </p>
            </div>
            <div className={styles.mapContainer}>
              {/* Gerçek bir uygulamada Google Maps veya benzeri bir entegrasyon yapılabilir */}
              <div className={styles.mapPlaceholder}>
                <FiMapPin className={styles.mapIcon} />
                <p>{airportDetails.AirportName}'ın Etkileşimli Haritası</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "runways" && (
          <div className={styles.runwaysSection}>
            <h2 className={styles.sectionTitle}>Pist Bilgisi</h2>
            <div className={styles.runwaysGrid}>
              {airportDetails.runways.map((runway) => (
                <div key={runway.RunwayID} className={styles.runwayCard}>
                  <div className={styles.runwayHeader}>
                    <MdOutlineRunCircle className={styles.runwayIcon} />
                    <h3 className={styles.runwayName}>{runway.Name}</h3>
                  </div>
                  <div className={styles.runwayDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Uzunluk:</span>
                      <span className={styles.detailValue}>{runway.Length} metre</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Genişlik:</span>
                      <span className={styles.detailValue}>{runway.Width || "Bilinmiyor"} metre</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Yüzey Tipi:</span>
                      <span className={styles.detailValue}>{runway.SurfaceType}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Aydınlatma:</span>
                      <span className={styles.detailValue}>{runway.Lighting || "Evet"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className={styles.servicesSection}>
            <h2 className={styles.sectionTitle}>Havaalanı Hizmetleri</h2>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>🛒</div>
                <h3 className={styles.serviceTitle}>Alışveriş</h3>
                <p className={styles.serviceDescription}>
                  Duty-free mağazalar, lüks markalar ve marketler mevcuttur.
                </p>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>🍽️</div>
                <h3 className={styles.serviceTitle}>Yemek</h3>
                <p className={styles.serviceDescription}>
                  Çeşitli restoranlar ve kafeler yerel ve uluslararası mutfaklar sunmaktadır.
                </p>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>💺</div>
                <h3 className={styles.serviceTitle}>Salonlar</h3>
                <p className={styles.serviceDescription}>
                  İş sınıfı yolcuları ve üyeler için premium salonlar mevcuttur.
                </p>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>🅿️</div>
                <h3 className={styles.serviceTitle}>Otopark</h3>
                <p className={styles.serviceDescription}>
                  Kısa ve uzun süreli otopark seçenekleri, servisli.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "weather" && (
          <div className={styles.weatherSection}>
            <h2 className={styles.sectionTitle}>Mevcut Hava Durumu</h2>
            <div className={styles.weatherCard}>
              <div className={styles.weatherMain}>
                <FiWind className={styles.weatherIcon} />
                <div className={styles.weatherTemp}>22°C</div>
                <div className={styles.weatherCondition}>Parçalı Bulutlu</div>
              </div>
              <div className={styles.weatherDetails}>
                <div className={styles.weatherDetail}>
                  <span>Rüzgar:</span>
                  <span>12 km/h NE</span>
                </div>
                <div className={styles.weatherDetail}>
                  <span>Nem:</span>
                  <span>65%</span>
                </div>
                <div className={styles.weatherDetail}>
                  <span>Görünürlük:</span>
                  <span>10 km</span>
                </div>
                <div className={styles.weatherDetail}>
                  <span>Basınç:</span>
                  <span>1012 hPa</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportDetails;
