import React from "react";
import "../css/edit.css";
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
        <div className="editBody">
            <h3 id="editHeader">Edit Message</h3>
            <input type="text" name="edited" id="edited" onChange={e => setEdited({...edited, content: e.target.value})} value={edited.content}/>
            <div id="editButtonsDiv">
                <button className="editButtons" id="cancelEditBtn" onClick={() => setChatPage({page:"chat"})}>Cancel</button>
                <button className="editButtons" id="saveEditBtn" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
    
}
 
export default EditMessage;