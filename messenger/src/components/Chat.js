import React, {useState} from "react";
import "../css/login.css";
import "../css/chat.css";
import logo from '../logo/logo.png';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import axios from 'axios'

function Chat ({setUser,user}) {

    const [reciever, setReciever] = useState({reciever_id: "", reciever_username: ""});
    const [message, setMessage] = useState({sender_id: "", reciever_id: "", content: "", time: ""});

    const handleSend = async e => {
        e.preventDefault();

        const {data} = await axios.post("http://localhost:8081/messages", 
            { 'sender': user.phone_no, 'receiver': reciever.reciever_id, 'content': message.content, 'time': Date().toLocaleString() },
            { headers: {"Content-Type": "application/json"} });
        
        console.log(data)
    }

    const query1 = useQuery('users', async()=>{
        const {data} = await axios.get("http://localhost:8081/users")
        return data
      },{
        refetchInterval:1000
      })

      
      const query2 = useQuery('messages', async()=>{
        if(reciever.reciever_id !== ""){
            //const data1 = await axios.get("http://localhost:8081/messages/from/" + reciever.reciever_id + "/to/" + user.phone_no);
            const {data} = await axios.get("http://localhost:8081/messages/from/" + user.phone_no + "/to/" + reciever.reciever_id);
            
            return data
        }
      },{
        refetchInterval:1000
      })

    return (
        <div className="chatBody">
            <div className="headerDiv">
                <img className="logo" src={logo} alt="Chatr"/>
            </div>
        <div className="container">
            <div className="leftDiv">
                <div className="header">Chats</div>
                    <div className="chatList">
                        <div className="chat">
                            <div className="chatName">
                                {query1.data && <div>
                                {query1.data.map((p,i)=>(<li key={p.phone_no}><button key={p.phone_no} onClick={() => setReciever({reciever_id: p.phone_no, reciever_username: p.name})}>{p.name}</button></li>))} </div>}
                            </div>        
                        </div>
                    </div>
            </div>
            <div className="rightDiv">
                <div className="header">
                    <div className="chatName">{reciever.reciever_username}</div>
                </div>
                <div className="chatWindow">
                {query2.data && <div className="messages">
                                {query2.data.map((p,i)=>(p.sender.phone_no === user.phone_no ?
                                    <li className="sent">{p.content}</li> : 
                                    <li className="recieved" >{p.content}</li>
                                ))} </div>}
                </div>
                <form className="form-properties" onSubmit={handleSend}>
                
                    <div className="form-inner">
                        <div className="form-group">
                            <input type="text" placeholder="Type your message..." name="name" id="name" onChange={e => setMessage({...message, content: e.target.value})} value={message.content}/>
                            <button className="sendBtn">Send</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
        </div>
    );
    
}
 
export default Chat;