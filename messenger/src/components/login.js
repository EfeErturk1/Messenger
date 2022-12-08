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

function Login ({setUser, getName}) {

    const [details, setDetails] = useState({username: "", password: ""});
    const [errmsg, setErrMsg] = useState({message : ""});

    const handleLogin = async e => {
        e.preventDefault();

        
        const {data} = await axios.post("http://localhost:8081/users/login/1", "123" , { headers: {"Content-Type": "application/json"}});
        
        console.log(data);
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
        <form className="form-properties" onSubmit={handleLogin}>
            
            <div className="form-inner">
                <div className="form-group">
                    <label >Name: </label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <div className="formbtn"><button className="loginbtn">Log in</button>
                
                </div>
            </div>
            <div>{errmsg.message}</div>
        </form>
    );
    
}
 
export default Login;