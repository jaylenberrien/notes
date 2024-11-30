const Note = require('../Models/Notes');

const createNote = async(req, res) =>{
    const {entry} = req.body 
    
    try{
        const createdEntry = await Note.createNote(entry)
        res.status(200).json({entry: createdEntry})
    }catch (error){
        res.status(400).json({ error: error.message })
    }

}


const getNotes = async (req, res) =>{
    try{
        const notes = await Note.find({}).sort({createdAt: -1});
        res.status(200).json(notes);
    }catch (error){
        res.status(400).json({error: error.message});
    }

}


const deleteNote = async (req, res) =>{
    try{
        const result = await Note.findByIdAndDelete(req.body.entryId);
        res.status(200).json("Deleted");
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    deleteNote,
    createNote,
    getNotes,
   
}