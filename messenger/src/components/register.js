import React, {useState} from "react";
import { Link , Navigate} from "react-router-dom";
import "../css/login.css";

function Register (/*{setName,getName}*/) {

    const [details, setDetails] = useState({phoneno: "", password: ""});
    const [errmsg, setErrMsg] = useState({message : ""});
    const [success, setSuccess] = useState({state: false});

    const handleRegister = (e) => {
        e.preventDefault();

        const response = UserService.register(details);
        response.then(value => {
            if(value !== true){
                setErrMsg({message : value.message});
            }
            else{
                setSuccess({state: true});
            }
        });
    }

    return (
        <div className="form-container">
        <form className="form-properties" onSubmit={handleLogin}>
            <label >Phone Number: </label>
            <input type="text" name="phoneno" id="phoneno" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
            <label >Name: </label>
            <input type="text" name="name" id="name" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
            <label>Password: </label>
            <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>                
            <button class="button-36" role="button">Register</button>
            <div>{errmsg.message}</div>
        </form>
        <button className="reg-link">Already have an account? Login here.</button>
        </div>
        { success.state ? (<Navigate push to="/login"/>) : null }
    );
    
}
 
export default register;