// import React from 'react'
import noteContext from '../context/notes/noteContext'
import React,{useContext, useState} from 'react'

const AddNote = (props) => {
    const context=useContext(noteContext)
    const {addNote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        //invoking the api call by passing the arguments
        addNote(note.title,note.description,note.tag);
        //again setting fields to empty
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added successfully","success")
    }
    const onChange=(e)=>{
        // ...note is spread operator,it means initial value should be there or after that wrtten objects should be concateneted or overriden.
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
                <h2>Add a note</h2>
                <form className='my-3'>
                    <div className="form-group">
                        <label htmlFor="title">title</label>
                        <input type="text" className="form-control" minLength={5}  required id="title"  name="title" aria-describedby="emailHelp" placeholder="Enter something" value={note.title} onChange={onChange}/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <input type="text" className="form-control" id="description"  minLength={5} required name="description" placeholder="describe something" value={note.description} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag"  minLength={5} required placeholder="Enter your tag" value={note.tag} onChange={onChange} />
                    </div>
                    
                    <button type="submit" disabled={note.title.length<5||note.description.length<5}className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                
            </div>
    </div>
  )
}

export default AddNote
