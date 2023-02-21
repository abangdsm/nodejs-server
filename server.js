const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")


const app = express()

app.use(BodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database: "ucapan",
    user: "root",
    password: ""
})

db.connect((err) => {
    if(err) throw err
    console.log('Database Connected!')

    // Untuk menerima data
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM tbucapan"
        db.query(sql, (err, result) => {
            const ucapan = JSON.parse(JSON.stringify(result))
            res.render("index", {ucapan: ucapan, title: "Ucapan & Doa"})
        })
    })

    // Untuk mengirim data
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO tbucapan (nama_lengkap, ucapan) VALUES ('${req.body.nama_lengkap}', '${req.body.ucapan}');`
        db.query(insertSql, (err, result) => {
            if(err) throw err
            res.redirect("/")
        })
    })

})

app.listen(8000, () => {
    console.log('Server Ready!')
})