const { createNote, getNotes } = require('../Controllers/NotesController');

const express = require('express');
const router = express.Router()

router.post('/create', createNote)

router.get('/notes', getNotes)


module.exports = router