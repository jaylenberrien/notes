const { createNote, getNotes, removeNote } = require('../Controllers/NotesController');

const express = require('express');
const router = express.Router();

router.post("/create", createNote);

router.get("/notes", getNotes);

router.delete("/delete", removeNote);


module.exports = router;