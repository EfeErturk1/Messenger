import React, {useState} from "react";
import "../css/chat.css";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import axios from 'axios'

function EditMessage ({setChatPage,user,edited,setEdited}) {

    const handleSave = async () => {
        /*
        if(newGroup.name === ""){
            alert("Please enter a group name");
            return false;
        }
        const {data} = await axios.post("http://localhost:8081/groups/create", 
                { 'name': newGroup.name, 'participants': newGroup.participants },
                { headers: {"Content-Type": "application/json"} });
        */
       
        setChatPage({page:"chat"});
        
    }

    return (
        <div className="chatContainer" style={{backgroundColor: "lightgreen"}}>
            <h1>Edit Message</h1>
            <input type="text" name="edited" id="edited" onChange={e => setEdited({...edited, content: e.target.value})} value={edited.content}/>
            <button className="cancelEditBtn" onClick={() => setChatPage({page:"chat"})}>Cancel</button>
            <button className="saveEditBtn" onClick={handleSave}>Save</button>
        </div>
    );
    
}
 
export default EditMessage;