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

function Group ({setChatPage,user}) {

    const [newGroup, setNewGroup] = useState({name: "", participants: [{'phone_no':user.phone_no}], phone_no: "" });

    const handleNewGroup = async () => {
        //const {data} = await axios.post("http://localhost:8081/groups/delete", {},{params : {"id":"6"}})
        if(newGroup.name === ""){
            alert("Please enter a group name");
            return false;
        }
        const {data} = await axios.post("http://localhost:8081/groups/create", 
                { 'name': newGroup.name, 'participants': newGroup.participants },
                { headers: {"Content-Type": "application/json"} });

        setChatPage({page:"chat"});
        
    }

    const handleNewParticipant = () => {
        if(!newGroup.participants.some(p => p.phone_no === newGroup.phone_no))
            setNewGroup({...newGroup, participants: [...newGroup.participants, {'phone_no':newGroup.phone_no}]});
    }

    const handleRemoveParticipant = ( id ) => {
        setNewGroup({...newGroup, participants: newGroup.participants.filter(function(p) { 
            return p.phone_no !== id
        })});
    }

    console.log(newGroup);

    return (
        <div className="chatContainer" style={{backgroundColor: "violet"}}>
            <h1>Create Group</h1>
            <input type="text" placeholder="Group Name" name="groupName" id="groupName" onChange={e => setNewGroup({...newGroup, name: e.target.value})}/>
            <input type="text" placeholder="New Participant" name="participantPhone" id="participantPhone" onChange={e => setNewGroup({...newGroup, phone_no: e.target.value})}/>
            <button className="addParticipantBtn" onClick={handleNewParticipant}>Add Participant</button>
            <div className="addedParticipants">
            { newGroup.participants.map((p,i) => ( i > 0 && <li>{p.phone_no}
                    <button onClick={() => handleRemoveParticipant(p.phone_no)}>X</button>
                </li> ))}
            </div>
            <button className="cancelGroupBtn" onClick={() => setChatPage({page:"chat"})}>Cancel</button>
            <button className="createGroupBtn" onClick={handleNewGroup}>Create group</button>
        </div>
    );
    
}
 
export default Group;