const html = require('express').Router();


// GET Route for homepage
html.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });
  
  // GET Route for notes page
html.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  });
  
 module.exports = html; 