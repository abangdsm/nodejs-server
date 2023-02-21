const express = require("express")
const mysql = require("mysql")

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    database: "ucapan",
    user: "root",
    password: ""
})

db.connect((err) => {
    if(err) throw err
    console.log('Database Connected!')

    const sql = "SELECT * FROM tbucapan"
    db.query(sql, (err, result) => {
        const users = JSON.parse(JSON.stringify(result))
        console.log('Hasil database -> ', users);
        app.get("/", (req, res) => {
            res.send(users)
        })
    })

})

app.listen(8000, () => {
    console.log('Server Ready!')
})