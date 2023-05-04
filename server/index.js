const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('./db');
const path = require('path');

 // Set up middleware to parse incoming request bodies as JSON. 
 // Now can access JSON data sent in a POST request body using the req.body object
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 



//Routes

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



// route that handles incoming login reqs
// checks if email inputted exists in db 
// post req not get, bc need to take email out of the body
app.post('/login', (req, res) => {
    const email = req.body.email;
    pool.query('SELECT * FROM merchants where email = $1', [email], (error, result) => {
        if (error) {
            console.error('Error executing query', error.stack);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email' })
        }
        res.json({ message: 'Login successful' })
    });
})

const getUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM merchants');
    return rows;
};
  
app.get('/users', async (req, res) => {
const users = await getUsers();
res.json(users);
});

//Start server by calling listen() method on ur app
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})