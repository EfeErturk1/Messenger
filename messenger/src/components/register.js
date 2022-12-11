import React, {useState} from "react";
import "../css/login.css";
import logo from '../logo/logo.png';
import axios from 'axios'

function Register ({setPage}) {

    const [details, setDetails] = useState({phoneno: "", username: "", password: ""});
    const [errmsg, setErrMsg] = useState({message : ""});

    const handleRegister = async (e) => {
        e.preventDefault();

        try{
            const {data} = await axios.post("http://localhost:8081/users", 
                { 'phone_no': details.phoneno , 'name': details.username , 'password': details.password },
                { headers: {"Content-Type": "application/json"}});
            setPage({type:"login"});
        }catch{
            setErrMsg({message : "Invalid attempt"});
        }
        
    }

    return (
        <div className="form-container">
            <img className="logo" src={logo} alt="Chatr"/>
            <form className="form-properties" onSubmit={handleRegister}>
                <label >Phone Number: </label>
                <input type="text" name="phoneno" id="phoneno" onChange={e => setDetails({...details, phoneno: e.target.value})} value={details.phoneno}/>
                <label >Name: </label>
                <input type="text" name="name" id="name" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
                <label>Password: </label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>                
                <button class="button-36" role="button">Register</button>
                <div>{errmsg.message}</div>
            </form>
            <button className="reg-link" onClick={() => setPage({type:"login"})}>Already have an account? Login here.</button>
        </div>
    );
    
}
 
export default Register;