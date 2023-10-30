import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit= async (e)=>{
      const {name,email,password}=credentials;
        e.preventDefault();
        const response=await fetch(`https://notesappbackend3-fn9c.onrender.com/api/auth/createuser`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                // 'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZmQ5YTFjNjU0ZmQ0MDljNmFiMmU4In0sImlhdCI6MTY3NjY2MzI1MH0.VScLEEc3_gSj8mxhFIZqw5OlxFxebaKEBUdafmiwQX0"
            },
            body: JSON.stringify({name,email,password})
        })
        const json=await response.json()
        console.log(json)
        if (json.success){
            localStorage.setItem("token",json.authtoken)
            navigate("/home");
            props.showAlert("Acoount Created successfully","success")
        }
        else{
            props.showAlert("Invalid credentials","danger")
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="conatiner mt-2">
      <h1>Create An Account To Continue</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name"aria-describedby="emailHelp" onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your name with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email"aria-describedby="emailHelp" onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
