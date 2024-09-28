const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000; //puerto


app.use(cors());
app.use(express.json());

// conf db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'productos'
});

// Conexión db
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Rutas para manejar las operaciones CRUD
app.get('/productos', (req, res) => {
    connection.query('SELECT * FROM productos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/productos', (req, res) => {
    const { title, body } = req.body;
    connection.query('INSERT INTO productos (title, body) VALUES (?, ?)', [title, body], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, title, body });
    });
});

app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    connection.query('UPDATE productos SET title = ?, body = ? WHERE id = ?', [title, body, id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204); 
    });
});

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204); 
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});