import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const getNotes = async () => {
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
           
        })
        //const json= response.json()
        //frontend adding note
        const json=await response.json();
        console.log(json);
        setNotes(json)
        
    }


    const addNote = async (title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/addnotes/`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                //getting the token from localsorage saved by localstorage.setitem
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note= await response.json()
        //frontend adding note
        setNotes(notes.concat(note))
        console.log("adding a new note",note);
        
    }
    const deleteNote = async (id) => {
        //api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            
        })
        const json=await response.json()
        console.log(json)
        console.log("deleting a note with id " + id)
        //notes.filter will delete the note if _id does not matches the id  of note
        //frontend deleting note
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    const editNote = async (id, title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json()
        console.log(json)
        //below line will create a deep copy of array of notes in javascript object format
        let newNote=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }

        }
        setNotes(newNote);
    }

    return (
        <>
            <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote ,getNotes}}>
                {props.children}
            </NoteContext.Provider>
        </>
    )
}

export default NoteState;