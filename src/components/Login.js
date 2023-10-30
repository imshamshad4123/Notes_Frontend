import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response=await fetch(`https://notesappbackend3-fn9c.onrender.com/api/auth/login`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                // 'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZmQ5YTFjNjU0ZmQ0MDljNmFiMmU4In0sImlhdCI6MTY3NjY2MzI1MH0.VScLEEc3_gSj8mxhFIZqw5OlxFxebaKEBUdafmiwQX0"
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password })
        })
        const json=await response.json()
        console.log(json)
        if (json.success){
            //saving the token in localstorage and redirecting to home
            localStorage.setItem("token",json.authtoken)
            props.showAlert("logged in successfully","success")
            navigate("/home");
        }
        else{
            props.showAlert("Invalid Credentials","danger")
            navigate("/signup")
        }
    
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className="mt-3">
            <h1>Please Login to Continue to Get Access to Notebook on the Cloud</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email"onChange={onChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"id="password" value={credentials.password} placeholder="Password" onChange={onChange}/>
                </div>
               
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
