const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"./dist")));

const host="localhost";
const usuario="root";
const clave="4227";
const basedatos="ministerio";
const tabla="convenios";
//gg

const db = mysql.createConnection({
    host: host,
    user: usuario,
    password: clave,
    database: basedatos
});

db.connect((err) => {
    if (err) {
      
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Base de datos conectada");
});

app.get("/convenios", (req, res) => {
    const query = "SELECT * FROM "+basedatos+"."+tabla;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

app.get("/cantidad", (req, res) => {
    const query = "SELECT COUNT(*) FROM "+basedatos+"."+tabla;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

app.get("/fechas", (req, res) => {
    const query = "SELECT YEAR(STR_TO_DATE(fecha, '%d/%m/%Y')) AS anio, COUNT(*) AS total FROM "+basedatos+"."+tabla+" GROUP BY anio ORDER BY anio;";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

app.get("/convenios/:id", (req, res) => {
    console.log(req.params.id);
    const id=req.params.id;
    const query =`SELECT * FROM `+basedatos+`.`+tabla+` where numero like ${id}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

app.get("/estadisticas", (req, res) => {
    const query = "SELECT (SELECT COUNT(*) FROM "+basedatos+"."+tabla+") AS total,(SELECT COUNT(*) FROM "+basedatos+"."+tabla+" WHERE YEAR(STR_TO_DATE(fecha, '%d/%m/%Y')) = YEAR(CURDATE()) - 1) AS totalultimoanio,(SELECT COUNT(*) FROM "+basedatos+"."+tabla+" WHERE YEAR(STR_TO_DATE(fecha, '%d/%m/%Y')) = YEAR(CURDATE())) AS totalanioactual,(SELECT COUNT(*) FROM "+basedatos+"."+tabla+" WHERE (MONTH(STR_TO_DATE(fecha, '%d/%m/%Y')) = MONTH(CURDATE())) AND (YEAR(STR_TO_DATE(fecha, '%d/%m/%Y')) = YEAR(CURDATE()))) AS totalultimomes;";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

app.post("/insertar", (req, res) => {
    try {
        //const query = `INSERT INTO ministerio.convenios (id, nombre, descripcion) VALUES (?, ?, ?)`;
        const query = "INSERT INTO "+basedatos+"."+tabla+" (numero, normalegal, descripcion, fecha, enlace, resumen, pdf, estado) VALUES (?,?,?,?,?,?,?,?)";
        const values = [req.body.numero, req.body.normalegal, req.body.descripcion,req.body.fecha,req.body.enlace,req.body.resumen,req.body.pdf,req.body.estado];
        
        db.query(query, values, (err, results) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).send("Error inserting data");
            }
            console.log("Subido!");
            res.status(200).send("Convenio subido exitosamente");
        });
        console.log(req.body);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Error al procesar la solicitud");
    }
});

app.get("/busqueda", (req, res) => {
    const { busqueda } = req.query;
    const query = "SELECT * FROM "+basedatos+"."+tabla+" WHERE descripcion LIKE '%"+busqueda+"%' OR pdf LIKE '%"+busqueda+"%' OR numero LIKE '"+busqueda+"%'";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

app.get("/listaconvenios", (req, res) => {
    const query = "SELECT numero FROM "+basedatos+"."+tabla;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
});



















