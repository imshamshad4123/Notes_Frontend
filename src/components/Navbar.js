import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    let location = useLocation();

            // useEffect(() => {
            //     // Google Analytics
            //     console.log(location.pathname)
            // }, [location]);
    return (
        <div>
            
            <nav className="navbar  navbar-expand-lg  bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MyNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/Home'?"active":""}`} aria-current="page" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/About'?"active":""}`} to="/About">About</Link>
                            </li>


                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                            <Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
                        </form>:<button className='btn btn-success' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
