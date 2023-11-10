const express = require('express')
const app = express()
const port = 3000
const config={
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql=require('mysql')
const connection = mysql.createConnection(config)
const sql = "INSERT INTO people(name) values ('Mateus')"
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
    const sql = "SELECT name FROM people";
    const connection = mysql.createConnection(config)
    connection.query(sql, (error, results, fields) => {
        if (error) {
            return res.status(500).send('Error fetching names from the database');
        }

        let htmlResponse = '<h1>Full Cycle Rocks!</h1>';
        htmlResponse += '<ul>';
        results.forEach((row) => {
            htmlResponse += `<li>${row.name}</li>`;
        });
        htmlResponse += '</ul>';
        connection.end()
        res.send(htmlResponse);
    });
});

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)
})