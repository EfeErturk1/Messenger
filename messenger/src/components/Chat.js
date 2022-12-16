import React, {useState} from "react";
import "../css/chat.css";
import Group from './Group';
import EditMessage from './EditMessage';
import logo from '../logo/logo.png';
import {
    useQuery
  } from 'react-query'
import axios from 'axios'

function Chat ({setUser,user}) {

    const [reciever, setReciever] = useState({reciever_id: "", reciever_username: "", reciever_type: "", group_id :"", group_name:""});
    const [message, setMessage] = useState({sender_id: "", reciever_id: "", content: "", time: ""});
    const [newReciever, setNewReciever] = useState({id: ""});
    const [chatPage, setChatPage] = useState({page: "chat"});
    const [edited, setEdited] = useState({id: "", content: ""});

    const handleSend = async e => {
        e.preventDefault();

        var now = new Date();
        if( reciever.reciever_type === "user" ){
            
            const {data} = await axios.post("http://localhost:8081/messages", 
                { 'sender': user.phone_no, 'receiver': reciever.reciever_id, 'content': message.content, 
                'time': now.getHours().toLocaleString() + ":" + now.getMinutes().toLocaleString().padStart(2, '0')},
                { headers: {"Content-Type": "application/json"} });
            
            setMessage({...message, content:""});
        }
        else if( reciever.reciever_type === "group" ){
            
            const {data} = await axios.post("http://localhost:8081/groups/send-message", 
                { 'sender': user.phone_no, 'content': message.content, 
                'time': now.getHours().toLocaleString() + ":" + now.getMinutes().toLocaleString().padStart(2, '0')},
                { headers: {"Content-Type": "application/json"}, params : {"id": reciever.group_id} });
            
            setMessage({...message, content:""});
        }
    }

    const handleDelete = async id => {
        const {data} = await axios.delete("http://localhost:8081/messages/" + id);
    }

    const handleEdit = async (e_id, e_content) => {
        setEdited({id: e_id, content: e_content});
        setChatPage({page:"editMessage"});
    }

    const handleNewReciever = async e => {
        e.preventDefault();

        if(newReciever.id === ""){
            alert("Please enter a valid phone number");
            return false;
        }

        const {data} = await axios.get("http://localhost:8081/users/" + newReciever.id);
        
        if(data !== ""){
            setReciever({reciever_id: data.phone_no, reciever_username: data.name, reciever_type: "user"});
        }
    }


    const query1 = useQuery('users', async()=>{
        const {data} = await axios.get("http://localhost:8081/messages/contacts/"+user.phone_no)
        
        return data
      },{
        refetchInterval:1000
      })

      const query2 = useQuery('groups', async()=>{
        const {data} = await axios.get("http://localhost:8081/users/groupchats/"+user.phone_no)
        
        return data
      },{
        refetchInterval:1000
      })

      
      const query3 = useQuery('messages', async()=>{
        if(reciever.reciever_type === "user"){
            const {data} = await axios.get("http://localhost:8081/messages/from/" + user.phone_no + "/to/" + reciever.reciever_id);
            
            return data
        }
        else if(reciever.reciever_type === "group"){
            const {data} = await axios.get("http://localhost:8081/groups/messages/" + reciever.group_id );
            
            return data
        }
      },{
        refetchInterval:1000
      })

    return (
        <div className="chatBody">
            
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>
            <div className="headerDiv">
                <img className="logo" id="chatLogo" src={logo} alt="Chatr"/>
            </div>
            { chatPage.page === "group" && <Group setChatPage={setChatPage} user={user}/> }
            { chatPage.page === "editMessage" && <EditMessage setChatPage={setChatPage} edited={edited} setEdited={setEdited}/> }
            { chatPage.page === "chat" && 
            <div className="chatContainer">
                <div className="leftDiv">
                    <div className="header">Chats</div>
                        <div className="chatList">

                            <form className="newChatForm" onSubmit={(handleNewReciever)}>
                                <input type="text" placeholder="New chat" name="newChat" id="newChat" onChange={e => setNewReciever({id: e.target.value})}/>
                            </form>

                            <button className="newGroupBtn" onClick={() => setChatPage({page:"group"})}>New group</button>


                            <div className="chat">
                                <div className="chatName">
                                {query1.data && <div>
                                        {query1.data.map((p,i)=>(<li key={p.phone_no}>
                                            <button className ="chatOption" onClick={() => setReciever({reciever_id: p.phone_no, reciever_username: p.name, reciever_type: "user"})}>
                                                <span className="glyphicon glyphicon-user">&nbsp;</span>
                                                {p.name}
                                            </button></li>))} </div>}

                                    {query2.data && <div>
                                        {query2.data.map((p,i)=>(<li key={p.groupId}>
                                            <button className ="chatOption" onClick={() => setReciever({reciever_type: "group", group_id: p.groupId, group_name: p.name})}>
                                                <span className="glyphicon glyphicon-user"></span>
                                                <span className="glyphicon glyphicon-user">&nbsp;</span>
                                                {p.name}
                                            </button></li>))} </div>}
                                </div>        
                            </div>
                        </div>
                </div>
                <div className="rightDiv">
                    <div className="header">{ reciever.reciever_type === "user" ? reciever.reciever_username : reciever.group_name }</div>
                    <div className="chatWindow">
                    {query3.data && <div className="messages">
                                    {query3.data.map((p,i)=>(p.sender.phone_no === user.phone_no ?
                                        <li className="sent" key={p.message_id}>
                                            {p.content}
                                            <div className="mtime">{p.time}</div>
                                            <div className="isEdited">{p.edited && <span>edited</span>}</div>
                                            <button className="deleteBtn" onClick={() => handleDelete(p.message_id)}><span className="glyphicon glyphicon-trash"></span></button>
                                            <button className="editBtn" onClick={() => handleEdit(p.message_id, p.content)}><span className="glyphicon glyphicon-pencil"></span></button>
                                        </li> : 
                                        <li className="recieved" key={p.message_id}>
                                            {reciever.reciever_type === "group" && <div className="senderName">{p.sender.name}</div>}
                                            {p.content} 
                                            <div className="mtime">{p.time}</div>
                                            <div className="isEdited">{p.edited && <span>edited</span>}</div>
                                        </li>
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
            }
        </div>
    );
    
}
 
export default Chat;