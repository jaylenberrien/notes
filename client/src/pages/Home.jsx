import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
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

    // const form = document.querySelector('form');

    // form.addEventListener('keydown', function (event) {
    //     if (event.keyCode === 13) {
    //         // event.preventDefault();
    //         form.submit();
    //     }
    // });

    return(
        <>
            <div className="main-container">
                <h2>Notes for later</h2>
                <div>
                    <ul>
                        {notes && notes.map((note) => (
                            <li key={note._id}>{note.entry}</li>
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