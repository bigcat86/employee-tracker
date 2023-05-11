const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'sandlot_db'
  },
  console.log(`Connected to the sandlot_db database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
