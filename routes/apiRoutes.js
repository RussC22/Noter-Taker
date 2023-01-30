const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the feedback
notes.get("/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post("/notes", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { text, title } = req.body;

  // If all the required properties are present
  if (text && title) {
    // Variable for the object we will save
    const newnotes = {
      text,
      title,
      id: uuid(),
    };

    readAndAppend(newnotes, "./db/db.json");

    const response = {
      status: "success",
      body: newnotes,
    };

    res.json(response);
  } else {
    res.json("Error in posting new notes");
  }
});

module.exports = notes;
