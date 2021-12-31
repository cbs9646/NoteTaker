const notesRoute = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const { readFromFile } = require('../helpers/fsUtils');
const { writeToFile } = require('../helpers/fsUtils');
const { uuid } = require('uuid');


notesRoute.get('/', (req, res) => {
    readFromFile('./db/db.json').then((api_data) => res.json(JSON.parse(api_data)));
});

notesRoute.get('/:id', (req, res) => { 
    
const oldnotesId = req.params.id;
readFromFile('./db/db.json').then((api_data) => JSON.parse(api_data))
   .then((json) => {
     const result = json.filter((api_data) => api_data.id === oldnotesId);
    return result.length > 0
    ? res.json(result)
    : res.json("no note with that ID number");
   });
 });



  
  notesRoute.post('/', (req, res) => {
    
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
      res.json('Error in posting feedback');
    }
  });
  
module.exports = apiRoute;