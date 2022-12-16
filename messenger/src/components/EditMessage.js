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

function EditMessage ({setChatPage,edited,setEdited}) {

    const handleSave = async () => {
        if(edited.content === ""){
            alert("Please enter a message");
            return false;
        }
        const {data} = await axios.put("http://localhost:8081/messages/" + edited.id, 
                edited.content ,
                { headers: {"Content-Type": "application/json"} });
        
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