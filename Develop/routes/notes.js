const notes = require("express").Router();
const uniqid = require("uniqid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helper/fsutils");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    res.send(JSON.parse(data));
  });
});

notes.get("/:abcid", (req, res) => {
  const noteid = req.params.abcid;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteid);
      return result.length > 0
        ? res.json(result)
        : res.json("No tip with that ID");
    });
});

notes.delete("/:note_id", (req, res) => {
  const noteID = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => {
      return JSON.parse(data);
    })
    .then((noteList) => {
      const result = noteList.filter((note) => {
        return note.note_id !== noteID;
      });
      writeToFile("./db/db.json", result);
      res.json("delete!");
    });
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uniqid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

module.exports = notes;
