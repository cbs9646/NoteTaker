const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const { readFromFile } = require('../helpers/fsUtils');
const { writeToFile } = require('../helpers/fsUtils');
const { uuid } = require('../helpers/uuid');

notes.get('/:id', (req, res) => { 
    
const noteId = req.params.id;
readFromFile('./db/db.json').then((n_data) => JSON.parse(n_data))
   .then((json) => {
     const result = json.filter((n_data) => n_data.id === noteId);
    return result.length > 0
    ? res.json(result)
    : res.json("no note with that ID number");
   });
 });

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((n_data) => res.json(JSON.parse(n_data)));
});
notes.delete('/:id', (req,res) => {

  const noteId = req.params.id;
  readFromFile(".db/db.json")
  .then((notes) => JSON.parse(notes))
  .then((json) => {
    const result = json.filter((noteS) => noteS.id !== noteId);

    writeToFile("./db/db.json", result);

    res.json(`old note ${noteId} was deleted`);

  });
});

notes.post('/', (req, res) => {
    
    const { title, text, id } = req.body;
  
    
    if (req.body) {
      
      const newNotes = {
        title,
        text,
        newNote_id: uuid(),
      };
  
      readAndAppend(newNotes, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNotes,
      };
  
      res.json(response);
    } else {
      res.json('Error posting new note');
    }
  });
  
module.exports = notes;