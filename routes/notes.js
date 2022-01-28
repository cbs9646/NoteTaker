const ns = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

ns.get('/', (req, res) => 
    readFromFile('./db/db.json')
    .then((notes) => res.json(JSON.parse(notes)))
);


ns.get('/:id', (req, res) => { 
const noteId = req.params.id;
readFromFile('./db/db.json')
.then((notes) => JSON.parse(notes))
   .then((json) => {
     const result = json.filter((note) => note.id === noteId);
    return result.length > 0
    ? res.json(result)
    : res.json("no note with that ID number");
   });
 });


ns.delete('/:id', (req,res) => {

  const noteId = req.params.id;
  readFromFile('./db/db.json')
  .then((notes) => JSON.parse(notes))
  .then((json) => {
    const result = json.filter((note) => note.id !== noteId);
   
    writeToFile("./db/db.json", result);

    res.json(`old note ${noteId} was deleted`);

  });
});

ns.post('/', (req, res) => {
    console.log(req.body);
    const { title, text, id } = req.body;
      
    if (title && text) {
      
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
  
module.exports = ns;