const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema ({
    entry:{
        type: String,
    }
}, {timestamps: true});

notesSchema.statics.createNote = async function (entry){
    const newNote = await this.create({
        entry
    });

    return newNote
}


const Note = mongoose.model('Notes', notesSchema)

module.exports = Note;