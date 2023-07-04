const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'question-papers' directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use('/question-papers', express.static(path.join(__dirname, 'question-papers')));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Create a new PostgreSQL client instance
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Adarsh@123',
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((error) => {
    console.error('Error connecting to the PostgreSQL database:', error);
  });

// Search endpoint
app.get('/search', (req, res) => {
  const { studentClass, subject, year } = req.query;
  console.log('Received search request:', studentClass, subject, year);

  // Construct the SQL query
  const query = {
    text: `SELECT * FROM question_papers WHERE student_class ILIKE $1 AND subject ILIKE $2 AND year = $3`,
    values: [studentClass, subject, year],
  };

  // Execute the query
  client.query(query)
    .then((result) => {
      console.log('Query result:', result.rows);

      const questionPaper = result.rows[0];

      // Check if the question paper exists
      if (!questionPaper) {
        console.log('Question paper not found.');
        res.status(404).json({ error: 'Question paper not found.' });
        return;
      }

      // Render the template with the query result
      res.render('result', { questionPaper });
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('An error occurred while fetching data.');
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
  console.log('__dirname:', __dirname);
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Close the PostgreSQL client connection when the server is stopped
process.on('SIGINT', () => {
  client.end();
  process.exit();
});

