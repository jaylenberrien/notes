import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import ListItem from "../components/ListItem";
// import Note from "../../../backend/Models/Notes";
// import { response } from "express";

export default function Home () {


    const [entry, setEntry] = useState("");

    const handlechange = (value) =>{
        setEntry(value)
    }


    const [notes, setNotes] = useState([])

    useEffect(() =>{
        const fetchNotes = async () =>{
           const response = await axios.get('http://localhost:3000/notes/notes')
           setNotes(response.data)
        }

        fetchNotes()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/notes/create', 
                { entry: entry }, 
                { headers: { 'Content-Type': 'application/json' }}
            );

            setEntry('');
        
            const response = await axios.get('http://localhost:3000/notes/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const deleteNote = async (note) =>{
        const id = {
            entryId: note._id
        }
        const deleteReq = await axios.delete(`http://localhost:3000/notes/delete`, id); 
        console.log('sent req');
        console.log(deleteReq); 
        console.log(id);
    }

    return(
        <>
            <div className="main-container">
                <h2>Notes for later</h2>
                <div>
                    <ul>
                        {notes && notes.map((note) => (
                            <div class="entry">
                                <li key={note._id}>{note.entry}</li>
                                <button class="entry-button" onClick={() => deleteNote(note._id)}>test1</button>
                            </div>

                        ))}
                        
                    </ul>

                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <textarea className="input" type="text" value={entry} onChange={(e) => handlechange(e.target.value)} />
                        <button>Add</button>
                    </form>

                </div>
            
            </div>

        </>

    )
}