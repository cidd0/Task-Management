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
    console.log('POST /api/tasks req.body:', req.body);
    const { title, description, priority, deadline } = req.body;

    db.query(
        'INSERT INTO tasks (title, description, priority, deadline) VALUES (?, ?, ?, ?)',
        [title, description, priority, deadline],
        (err, results) => {
            if(err){
                console.error('DB INSERT error:', err);
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
    const id = req.params.id;
    const fields = [];
    const values = [];

    if (req.body.title !== undefined) {
        fields.push('title = ?');
        values.push(req.body.title);
    }
    if (req.body.description !== undefined) {
        fields.push('description = ?');
        values.push(req.body.description);
    }
    if (req.body.priority !== undefined) {
        fields.push('priority = ?');
        values.push(req.body.priority);
    }
    if (req.body.deadline !== undefined) {
        fields.push('deadline = ?');
        values.push(req.body.deadline);
    }
    if (req.body.status !== undefined) {
        fields.push('status = ?');
        values.push(req.body.status);
    }

    if (fields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);

    const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;

    // Add these logs:
    console.log('SQL:', sql);
    console.log('Values:', values);

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('UPDATE error:', err); // Log the actual error
            res.status(500).json({ error: 'Failed to update task', details: err.message });
        } else {
            res.json({ message: 'Task updated successfully' });
        }
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const id =  req.params.id;

    db.query(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        (err, results) => {
            if(err){
                res.status(500).json({ error: 'Failed to delete task' });
            } else {
                res.json({ message: 'Task deleted successfully' });
            }
        }
    )
})

app.get('/', (req, res) => {
    res.json({ message: 'Backend server is running'})
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});