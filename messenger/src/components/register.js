import React, {useState} from "react";
import { Link , Navigate} from "react-router-dom";
import UserService from "../services/UserService";

function register (/*{setName,getName}*/) {

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
        <form onSubmit={handleRegister}>
            <div className="form-inner">
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneno" id="phoneno" onChange={e => setDetails({...details, phoneno: e.target.value})} value={details.phoneno}/>
                </div>
                <div className="form-group">
                    <label >Name: </label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>

                <div className="formbtn"><button className="loginbtn">Register</button>
                    <Link className="registerbtn" to="/login">Login</Link>
                </div>
            </div>
            <div>{errmsg.message}</div>
            
            { success.state ? (<Navigate push to="/login"/>) : null }
        </form>
            
    );
    
}
 
export default register;