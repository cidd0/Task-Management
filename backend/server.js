const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if(err){
        console.log('Database connection failed:', err);
    } else {
        console.log('Database connected successfully');
    }
});

app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if(err){
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        }else {
            res.json(results);
        }
    })
});

app.post('/api/tasks', (req, res) => {
    const { title, description, priority, deadline } = req.body;

    db.query(
        'INSERT INTO tasks (title, description, priority, deadline) VALUES (?, ?, ?, ?)',
        [title, description, priority, deadline],
        (err, results) => {
            if(err){
                res.status(500).json({ error: 'Failed to create task'});
            } else {
                res.status(201).json({
                    message: 'Task created successfully',
                    taskId: results.insertId
                });
            }
        }
    )
});

app.put('/api/tasks/:id', (req, res) => {
    
})

app.get('/', (req, res) => {
    res.json({ message: 'Backend server is running'})
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});