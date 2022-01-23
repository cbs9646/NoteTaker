const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((n_data) => res.json(JSON.parse(n_data)));
});


notes.get('/:id', (req, res) => { 
const noteId = req.params.id;
readFromFile('./db/notes.json')
.then((n_data) => JSON.parse(n_data))
   .then((json) => {
     const result = json.filter((n_data) => n_data.id === noteId);
    return result.length > 0
    ? res.json(result)
    : res.json("no note with that ID number");
   });
 });


notes.delete('/:id', (req,res) => {

  const noteId = req.params.id;
  readFromFile(".db/db.json")
  .then((notes) => JSON.parse(notes))
  .then((json) => {
    const result = json.filter((note) => note.id !== noteId);
   
    writeToFile("./db/db.json", result);

    res.json(`old note ${noteId} was deleted`);

  });
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text, id } = req.body;
      
    if (req.body) {
      
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.error('Error posting new note');
      console.log(error);
    }
  });
  
module.exports = notes;