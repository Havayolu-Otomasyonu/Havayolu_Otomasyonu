
# ✈️ Flight Management System

> Uçuş verilerini kullanıcı ve yönetici düzeyinde yönetmeye olanak tanıyan modern bir web tabanlı uçuş yönetim sistemi.

---

## 📝 Proje Özeti

Bu proje, havalimanı operasyonlarını kolaylaştırmak amacıyla geliştirilmiş bir uçuş yönetim sistemidir.  
Kullanıcılar uçuş bilgilerine kolayca erişebilirken, yöneticiler arka planda uçak, pist, personel ve uçuş detaylarını yönetebilir.

Sistem, **kullanıcı dostu bir arayüz**, **güncel veritabanı yönetimi** ve **güvenli veri işleme altyapısı**yla geliştirilmiştir.

---

## ⚙️ Geliştirme Ortamı

| Teknoloji | Açıklama |
|----------|----------|
| React.js | Kullanıcı arayüzü (Frontend) |
| Node.js (Express) | Sunucu tarafı uygulama geliştirme |
| MySQL | Veritabanı yönetimi |
| phpMyAdmin | Veritabanı görsel arayüz yönetimi |
| JavaScript, HTML, CSS | Web teknolojileri |
| dotenv | Ortam değişkeni yönetimi |
| Axios | API istekleri için HTTP istemcisi |

---

## 🚀 Projenin Kurulumu

```bash
# 1. Veritabanını phpMyAdmin ile içe aktar
# 2. Backend dizinine geç
cd backend
npm install

# .env dosyası oluştur
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=******
# DB_NAME=flight_db

npm start

# 3. Frontend dizinine geç
cd ../frontend
npm install
npm start
```

Tarayıcıda `http://localhost:3000` adresinden uygulamayı görüntüleyebilirsiniz.

---

## 🧑‍💻 Kullanıcı & Admin Özellikleri

### 👤 Kullanıcı Paneli:
- Uçuş listesi (tarih, uçuş kodu, kalkış-varış yeri, durum)
- Havalimanı bilgileri
- Uçuş sorgulama ekranı
- Navbar üzerinden kolay erişim

### 🛡️ Admin Paneli:
- Sağ üstteki seçim kutusundan geçiş yapılır
- Dashboard: Toplam uçuşlar, aktif uçaklar, iptaller ve yaklaşan uçuşlar
- Veri yönetimi modülleri:
  - Havalimanları
  - Havayolları
  - Uçuşlar
  - Uçaklar
  - Pistler
  - Personel

Her modül için **ekleme**, **güncelleme** ve **silme** işlemleri yapılabilir.



## 📚 Kaynaklar

- [phpMyAdmin](https://www.phpmyadmin.net/)  
- [W3Schools](https://www.w3schools.com/)  
- [ChatGPT / DeepSeek]  
- [GitHub Kod Reposu](https://github.com/)  
- [Stack Overflow](https://stackoverflow.com/)

---

## 📄 Lisans

Bu proje, yalnızca eğitim ve geliştirme amacıyla paylaşılmıştır. Ticari kullanım için uygun değildir.
