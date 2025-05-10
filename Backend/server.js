const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "havayolu_otomasyonu",
  port: "3306",
  
});

app.use(cors());
app.use(express.json());
app.get("/", (re, res) => {
  return res.json("From Backend Side");
});
app.get("/airports", (req, res) => {
  const sql = "SELECT * FROM airports";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.use(cors());
app.use(express.json());
app.get("/", (re, res) => {
  return res.json("From Backend Side");
});
app.get("/flights", (req, res) => {
  const sql = ` SELECT 
        f.FlightID,
        f.DepartureTime,
        f.ArrivalTime,
        da.City AS DepartureCity,
        aa.City AS ArrivalCity,
        f.Status
    FROM 
        Flights f
    JOIN 
        Airports da ON f.DepartureAirportID = da.AirportID
    JOIN 
        Airports aa ON f.ArrivalAirportID = aa.AirportID`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



app.post('/airports', async (req, res) => {
  const { AirportName, City, Country, Code } = req.body;

  // Veritabanına veri ekleme
  const sql = "INSERT INTO airports (AirportName, City, Country, Code) VALUES (?, ?, ?, ?)";
  
  try {
    db.query(sql, [AirportName, City, Country, Code], (err, result) => {
      if (err) return res.status(500).json({ error: "Hata oluştu" });
      return res.status(201).json({ message: "Havalimanı başarıyla eklendi!" });
    });
  } catch (err) {
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
});




app.listen(8081, () => {
  console.log("listening");
});
