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
  multipleStatements: true,
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

//havayolu bilgiler
app.get("/airports/:code", (req, res) => {
  const airportCode = req.params.code;

  const sql = `
    SELECT * FROM airports WHERE Code = ?;
    SELECT * FROM runways WHERE AirportID = (SELECT AirportID FROM airports WHERE Code = ?);
  `;

  db.query(sql, [airportCode, airportCode], (err, results) => {
    if (err) return res.status(500).json({ error: "Veri çekilemedi" });

    const airport = results[0][0]; // Havalimanı bilgisi
    const runways = results[1]; // Pist bilgileri

    return res.json({
      ...airport,
      runways: runways, // Pist bilgilerini de ekliyoruz
    });
  });
});



// Havayolu durumunu değiştirme (aktif/pasif)
app.put("/airlines/:id/toggle-status", (req, res) => {
  const airlineId = req.params.id;
  const sql = "UPDATE Airlines SET isActive = NOT isActive WHERE AirlineID = ?";
  
  db.query(sql, [airlineId], (err, result) => {
    if (err) return res.status(500).json({ error: "Durum güncellenemedi" });
    return res.json({ message: "Havayolu durumu güncellendi" });
  });
});




// Pistleri listele
app.get("/runways", (req, res) => {
  const sql = `
    SELECT r.*, a.AirportName, a.City, a.Code 
    FROM runways r
    JOIN airports a ON r.AirportID = a.AirportID
  `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Pist verisi çekilemedi" });
    return res.json(data);
  });
});

// Havalimanı silme işlemi
app.delete("/airports/:id", (req, res) => {
  const airportId = req.params.id;

  const deleteRunwaysSQL = "DELETE FROM runways WHERE AirportID = ?";
  const deleteAirportSQL = "DELETE FROM airports WHERE AirportID = ?";

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: "Transaction Error" });

    db.query(deleteRunwaysSQL, [airportId], (err) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: "Runway Delete Error" });
        });
      }

      db.query(deleteAirportSQL, [airportId], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: "Airport Delete Error" });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: "Commit Error" });
            });
          }

          res.json({
            message: "Airport and related runways deleted successfully!",
          });
        });
      });
    });
  });
});

// Havayollarını listeleme
app.get("/airlines", (req, res) => {
  const sql = "SELECT * FROM Airlines";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Havayolu detayları
app.get("/airlines/:id", (req, res) => {
  const airlineID = req.params.id;

  const sql = "SELECT * FROM Airlines WHERE AirlineID = ?";

  db.query(sql, [airlineID], (err, result) => {
    if (err) return res.status(500).json({ error: "Veri çekilemedi" });

    return res.json(result[0]); // Havayolu detayını dönüyoruz
  });
});

// Havayolu ekleme
app.post("/airlines", async (req, res) => {
  const { AirlineName, Country } = req.body;

  // Veritabanına veri ekleme
  const sql = "INSERT INTO Airlines (AirlineName, Country) VALUES (?, ?)";

  try {
    db.query(sql, [AirlineName, Country], (err, result) => {
      if (err) return res.status(500).json({ error: "Hata oluştu" });
      return res.status(201).json({ message: "Havayolu başarıyla eklendi!" });
    });
  } catch (err) {
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
});

app.get("/aircrafts", (req, res) => {
  const sql = "SELECT * FROM aircrafts";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Veri çekilemedi" });
    return res.json(data);
  });
});

// Yeni uçak ekle
// Uçak ekleme endpoint'i (düzeltilmiş)
app.post("/aircrafts", (req, res) => {
  const { Model, Capacity, AirlineID } = req.body;
  
  const sql = "INSERT INTO aircrafts (Model, Capacity, AirlineID) VALUES (?, ?, ?)";
  
  db.query(sql, [Model, Capacity, AirlineID], (err, result) => {
    if (err) return res.status(500).json({ error: "Uçak eklenemedi", details: err });
    return res.status(201).json({ 
      message: "Uçak başarıyla eklendi",
      aircraftId: result.insertId 
    });
  });
});

// Uçak güncelleme endpoint'i
app.put("/aircrafts/:id", (req, res) => {
  const aircraftId = req.params.id;
  const { Model, Capacity, AirlineID } = req.body;
  
  const sql = "UPDATE aircrafts SET Model = ?, Capacity = ?, AirlineID = ? WHERE AircraftID = ?";
  
  db.query(sql, [Model, Capacity, AirlineID, aircraftId], (err, result) => {
    if (err) return res.status(500).json({ error: "Uçak güncellenemedi", details: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Uçak bulunamadı" });
    }
    return res.json({ message: "Uçak başarıyla güncellendi" });
  });
});

// Uçak sil
app.delete("/aircrafts/:id", (req, res) => {
  const aircraftID = req.params.id;
  const sql = "DELETE FROM aircrafts WHERE AircraftID = ?";
  db.query(sql, [aircraftID], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Silme işlemi başarısız oldu" });
    return res.status(200).json({ message: "Uçak başarıyla silindi" });
  });
});
//Uçuş görüntüleme
app.use(cors());
app.use(express.json());
app.get("/", (re, res) => {
  return res.json("From Backend Side");
});
// Tüm uçuşları ilişkisel verilerle getirme (DÜZELTİLMİŞ)
app.get("/flights", (req, res) => {
  const sql = `
    SELECT 
      f.FlightID,
      f.DepartureTime,
      f.ArrivalTime,
      f.Status,
      f.AircraftID,
      f.DepartureAirportID,
      f.ArrivalAirportID,
      da.AirportName AS DepartureAirportName,
      da.City AS DepartureCity,
      da.Code AS DepartureCode,
      aa.AirportName AS ArrivalAirportName,
      aa.City AS ArrivalCity,
      aa.Code AS ArrivalCode,
      ac.Model AS AircraftModel,
      ac.Capacity,
      al.AirlineID,
      al.AirlineName
    FROM Flights f
    JOIN Airports da ON f.DepartureAirportID = da.AirportID
    JOIN Airports aa ON f.ArrivalAirportID = aa.AirportID
    JOIN Aircrafts ac ON f.AircraftID = ac.AircraftID
    JOIN Airlines al ON ac.AirlineID = al.AirlineID
    ORDER BY f.DepartureTime DESC
  `;
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ 
        error: "Uçuşlar getirilemedi",
        details: err.message 
      });
    }
    return res.json(data);
  });
});




// Yeni uçuş ekleme
app.post("/flights", (req, res) => {
  const { AircraftID, DepartureAirportID, ArrivalAirportID, DepartureTime, ArrivalTime, Status } = req.body;
  
  const sql = `
    INSERT INTO Flights 
    (AircraftID, DepartureAirportID, ArrivalAirportID, DepartureTime, ArrivalTime, Status)
    VALUES (?, ?, ?, ?, ?, ?);
    
    SELECT LAST_INSERT_ID() AS FlightID;
  `;
  
  db.query(sql, [AircraftID, DepartureAirportID, ArrivalAirportID, DepartureTime, ArrivalTime, Status], 
    (err, results) => {
      if (err) return res.status(500).json({ error: "Uçuş eklenemedi", details: err });
      
      const flightId = results[1][0].FlightID;
      
      // Eklenen uçuşu tüm ilişkileriyle getir
      const getSql = `
        SELECT 
          f.*,
          da.AirportName AS DepartureAirportName,
          da.City AS DepartureCity,
          da.Code AS DepartureCode,
          aa.AirportName AS ArrivalAirportName,
          aa.City AS ArrivalCity,
          aa.Code AS ArrivalCode,
          ac.Model AS AircraftModel,
          al.AirlineName
        FROM Flights f
        JOIN Airports da ON f.DepartureAirportID = da.AirportID
        JOIN Airports aa ON f.ArrivalAirportID = aa.AirportID
        JOIN Aircrafts ac ON f.AircraftID = ac.AircraftID
        JOIN Airlines al ON ac.AirlineID = al.AirlineID
        WHERE f.FlightID = ?
      `;
      
      db.query(getSql, [flightId], (err, flightData) => {
        if (err) return res.status(500).json({ error: "Uçuş bilgileri getirilemedi", details: err });
        return res.status(201).json(flightData[0]);
      });
    }
  );
});

// Uçuş güncelleme
app.put("/flights/:id", (req, res) => {
  const flightId = req.params.id;
  const { AircraftID, DepartureAirportID, ArrivalAirportID, DepartureTime, ArrivalTime, Status } = req.body;
  
  const sql = `
    UPDATE Flights SET
      AircraftID = ?,
      DepartureAirportID = ?,
      ArrivalAirportID = ?,
      DepartureTime = ?,
      ArrivalTime = ?,
      Status = ?
    WHERE FlightID = ?;
    
    SELECT 
      f.*,
      da.AirportName AS DepartureAirportName,
      da.City AS DepartureCity,
      da.Code AS DepartureCode,
      aa.AirportName AS ArrivalAirportName,
      aa.City AS ArrivalCity,
      aa.Code AS ArrivalCode,
      ac.Model AS AircraftModel,
      al.AirlineName
    FROM Flights f
    JOIN Airports da ON f.DepartureAirportID = da.AirportID
    JOIN Airports aa ON f.ArrivalAirportID = aa.AirportID
    JOIN Aircrafts ac ON f.AircraftID = ac.AircraftID
    JOIN Airlines al ON ac.AirlineID = al.AirlineID
    WHERE f.FlightID = ?;
  `;
  
  db.query(sql, [AircraftID, DepartureAirportID, ArrivalAirportID, DepartureTime, ArrivalTime, Status, flightId, flightId], 
    (err, results) => {
      if (err) return res.status(500).json({ error: "Uçuş güncellenemedi", details: err });
      if (results[0].affectedRows === 0) {
        return res.status(404).json({ error: "Uçuş bulunamadı" });
      }
      return res.json(results[1][0]);
    }
  );
});

// Uçuş silme
app.delete("/flights/:id", (req, res) => {
  const flightId = req.params.id;
  
  const sql = "DELETE FROM Flights WHERE FlightID = ?";
  
  db.query(sql, [flightId], (err, result) => {
    if (err) return res.status(500).json({ error: "Uçuş silinemedi", details: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Uçuş bulunamadı" });
    }
    return res.json({ message: "Uçuş başarıyla silindi" });
  });
});



app.post("/airports", async (req, res) => {
  const { AirportName, City, Country, Code } = req.body;

  // Veritabanına veri ekleme
  const sql =
    "INSERT INTO airports (AirportName, City, Country, Code) VALUES (?, ?, ?, ?)";

  try {
    db.query(sql, [AirportName, City, Country, Code], (err, result) => {
      if (err) return res.status(500).json({ error: "Hata oluştu" });
      return res.status(201).json({ message: "Havalimanı başarıyla eklendi!" });
    });
  } catch (err) {
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
});





// Pist ekleme endpoint'i
app.post("/runways", (req, res) => {
  const { RunwayNumber, Length, Width, SurfaceType, AirportID } = req.body;
  
  // Validasyon
  if (!RunwayNumber || !Length || !AirportID) {
    return res.status(400).json({ 
      error: "Pist numarası, uzunluk ve havalimanı ID zorunludur" 
    });
  }

  const sql = "INSERT INTO runways (RunwayNumber, Length, Width, SurfaceType, AirportID) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [RunwayNumber, Length, Width || 45, SurfaceType || 'Asphalt', AirportID], 
    (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ 
          error: "Pist eklenemedi",
          details: err.message 
        });
      }
      
      // Eklenen pisti ilişkileriyle getir
      const getSql = `
        SELECT r.*, a.AirportName, a.City, a.Code 
        FROM runways r
        JOIN airports a ON r.AirportID = a.AirportID
        WHERE r.RunwayID = ?
      `;
      
      db.query(getSql, [result.insertId], (err, runwayData) => {
        if (err) {
          console.error("SQL Error:", err);
          return res.status(500).json({ 
            error: "Pist bilgileri getirilemedi",
            details: err.message 
          });
        }
        return res.status(201).json(runwayData[0]);
      });
    }
  );
});

// Pist güncelleme endpoint'i
app.put("/runways/:id", (req, res) => {
  const runwayId = req.params.id;
  const { RunwayNumber, Length, Width, SurfaceType, AirportID } = req.body;
  
  // Validasyon
  if (!RunwayNumber || !Length || !AirportID) {
    return res.status(400).json({ 
      error: "Pist numarası, uzunluk ve havalimanı ID zorunludur" 
    });
  }

  const sql = `
    UPDATE runways SET
      RunwayNumber = ?,
      Length = ?,
      Width = ?,
      SurfaceType = ?,
      AirportID = ?
    WHERE RunwayID = ?;
    
    SELECT r.*, a.AirportName, a.City, a.Code 
    FROM runways r
    JOIN airports a ON r.AirportID = a.AirportID
    WHERE r.RunwayID = ?;
  `;
  
  db.query(sql, [
    RunwayNumber, 
    Length, 
    Width || 45, 
    SurfaceType || 'Asphalt', 
    AirportID, 
    runwayId,
    runwayId
  ], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ 
        error: "Pist güncellenemedi",
        details: err.message 
      });
    }
    if (results[0].affectedRows === 0) {
      return res.status(404).json({ error: "Pist bulunamadı" });
    }
    return res.json(results[1][0]);
  });
});

// Pist silme endpoint'i (zaten var ama kontrol edin)
app.delete("/runways/:id", (req, res) => {
  const runwayId = req.params.id;
  
  const sql = "DELETE FROM runways WHERE RunwayID = ?";
  
  db.query(sql, [runwayId], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ 
        error: "Pist silinemedi",
        details: err.message 
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pist bulunamadı" });
    }
    return res.json({ message: "Pist başarıyla silindi" });
  });
});


app.get("/personnels", (req, res) => {
  const sql = "SELECT * FROM Personnels";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Personel verisi çekilemedi", details: err });
    return res.json(data);
  });
});


app.post("/personnels", (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, Role, HireDate, Status } = req.body;

  const sql = `INSERT INTO Personnels 
    (FirstName, LastName, Email, PhoneNumber, Role, HireDate, Status) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    FirstName, LastName, Email, PhoneNumber || null, Role, HireDate || null, Status || 'Active'
  ], (err, result) => {
    if (err) return res.status(500).json({ error: "Personel eklenemedi", details: err });
    return res.status(201).json({ message: "Personel başarıyla eklendi", personnelId: result.insertId });
  });
});


app.delete("/personnels/:id", (req, res) => {
  const personnelId = req.params.id;
  const sql = "DELETE FROM Personnels WHERE PersonnelID = ?";
  db.query(sql, [personnelId], (err, result) => {
    if (err) return res.status(500).json({ error: "Personel silinemedi", details: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Personel bulunamadı" });
    return res.json({ message: "Personel başarıyla silindi" });
  });
});

app.put("/personnels/:id/status", (req, res) => {
  const personnelId = req.params.id;
  const { Status } = req.body;

  // Sadece 'Active' veya 'Inactive' olmalı
  if (Status !== 'Active' && Status !== 'Inactive') {
    return res.status(400).json({ error: "Status değeri 'Active' veya 'Inactive' olmalıdır." });
  }

  const sql = "UPDATE Personnels SET Status = ? WHERE PersonnelID = ?";
  db.query(sql, [Status, personnelId], (err, result) => {
    if (err) return res.status(500).json({ error: "Durum güncellenemedi", details: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Personel bulunamadı" });

    return res.json({ message: `Personel durumu '${Status}' olarak güncellendi` });
  });
});



app.listen(8081, () => {
  console.log("listening");
});
