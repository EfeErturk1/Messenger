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

        var now = new Date();
        const {data} = await axios.post("http://localhost:8081/messages", 
            { 'sender': user.phone_no, 'receiver': reciever.reciever_id, 'content': message.content, 
            'time': now.getHours().toLocaleString() + ":" + now.getMinutes().toLocaleString().padStart(2, '0')},
            { headers: {"Content-Type": "application/json"} });
        
        setMessage({...message, content:""});
        
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();

        const {data} = await axios.delete("http://localhost:8081/messages/" + id);
        
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
            
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>
            <div className="headerDiv">
                <img className="logo" src={logo} alt="Chatr"/>
            </div>
            <div className="chatContainer">
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
                    <div className="header">{reciever.reciever_username}</div>
                    <div className="chatWindow">
                    {query2.data && <div className="messages">
                                    {query2.data.map((p,i)=>(p.sender.phone_no === user.phone_no ?
                                        <li className="sent" key={p.message_id}>
                                            {p.content} 
                                            <div className="mtime">{p.time}</div>
                                            <button className="deleteBtn" onClick={e => handleDelete(e,p.message_id)}><span className="glyphicon glyphicon-trash"></span></button>
                                        </li> : 
                                        <li className="recieved" key={p.message_id}>{p.content} <div className="mtime">{p.time}</div></li>
                                    ))} </div>}
                    </div>
                    <form className="form-properties" onSubmit={handleSend}>
                    
                        <div className="form-inner">
                            <div className="form-group">
                                <input type="text" placeholder="Type your message..." name="mcontent" id="mcontent" onChange={e => setMessage({...message, content: e.target.value})} value={message.content}/>
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