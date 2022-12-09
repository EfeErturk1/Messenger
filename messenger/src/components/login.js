import React, {useState} from "react";
import "../css/login.css";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import axios from 'axios'

function Login ({setUser}) {

    const [details, setDetails] = useState({id: "", password: ""});
    const [errmsg, setErrMsg] = useState({message : ""});

    const handleLogin = async e => {
        e.preventDefault();

        
        const {data} = await axios.post("http://localhost:8081/users/login/" + details.id, details.password ,
            { headers: {"Content-Type": "application/json"}});
        
        setUser({username: data.username , phone_no: data.phone_no});

        /*const response = UserService.logIn(details);

        response.then(value => {
            console.log(value);
            if(value !== true){
                setErrMsg({message : value.message});
            }
            else{
                setName(details.username);
            }
        });*/

    }

    return (
        <div className="form-container">
        <form className="form-properties" onSubmit={handleLogin}>
            <label >Phone Number: </label>
            <input type="text" name="phoneno" id="phoneno" onChange={e => setDetails({...details, id: e.target.value})} value={details.id}/>
            <label>Password: </label>
            <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>                
            <button class="button-36" role="button">Log in</button>
            <div>{errmsg.message}</div>
        </form>
        <button className="reg-link">Don't have an account? Register here.</button>
        </div>
    );
    
}
 
export default Login;