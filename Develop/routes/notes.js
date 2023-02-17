const notes = require('express').Router();

const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

//GET
notes.get('/', (req, res) => {
  readFromFile("./db/db.json").then((data) =>
    res.json(JSON.parse(data))
  );
});

//POST
notes.post('/', (req, res) => {
  const { title, text } = req.body;
  const note = {
    title,
    text,
    id: uuidv4()
  };
  readAndAppend(note, './db/db.json');
  res.json(note)
});

//DELETE
notes.delete('/:id', (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    let newdb = JSON.parse(data).filter(note => note.id.toString() !== req.params.id.toString())
    writeToFile('./db/db.json', newdb)
    res.json('./db/db.json')
  })

})

module.exports = notes;