
# ✈️ Flight Management System

> Uçuş verilerini kullanıcı ve yönetici düzeyinde yönetmeye olanak tanıyan modern bir web tabanlı uçuş yönetim sistemi.

---
## 📸 Projeye Ait Ekran Resimleri
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/1.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/2.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/3.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/4.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/5.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/6.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/7.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/8.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/9.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/10.jpeg)
![Image alt](https://github.com/Havayolu-Otomasyonu/Havayolu_Otomasyonu/blob/ace8ff47e3d5a416a5ab0a1e2fe0ad7a8667c09e/screenshots/11.jpeg)

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
# DB_PASSWORD=" "
# DB_NAME=havayolu_otomasyonu

npm start

# 3. Frontend dizinine geç
cd ../frontend
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresinden uygulamayı görüntüleyebilirsiniz.

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
