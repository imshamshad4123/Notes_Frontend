import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const context = useContext(noteContext)
    let navigate = useNavigate();
    const { notes, getNotes,editNote } = context
    //using useeffect hook to fetchallnotes only once jaisehi user login hota hai
    useEffect(() => {
        //checking if the user has not logged in redirect to login page without showing home page
        // agar uske pass token hai matlab wo logged in hai to usko uske notes dikhao
        if (localStorage.getItem('token')){
            getNotes();

        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
   
    //use ref hook is used to give refernce to any element
    const ref = useRef(null)
    // refclose is used to close the modal window using useref hook 
    const refClose=useRef(null)
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
        
    }
    const handleClick=(e)=>{
        console.log('updating note',note)
        //after click on update note calling editnote funct to edit the notes in backend which takes id,and title and all
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        props.showAlert("updated successfully","success")
        // e.preventDefault();
        // addNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        //... jo pehle se hai use rehne do aur content add kro ya override kro
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNote  showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required value={note.etitle} aria-describedby="emailHelp" placeholder="Enter something" onChange={onChange} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" minLength={5} required value={note.edescription} placeholder="describe something" onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} minLength={5} required placeholder="Enter your tag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose}className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                {notes.length===0 && "no notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes

