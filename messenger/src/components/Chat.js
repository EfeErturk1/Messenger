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

function Chat ({setUser,user}) {

    const [reciever, setReciever] = useState({reciever_id: "", reciever_username: ""});
    const [message, setMessage] = useState({sender_id: "", reciever_id: "", content: "", time: ""});

    const handleSend = async e => {
        e.preventDefault();
    }

    const query1 = useQuery('users', async()=>{
        const {data} = await axios.get("http://localhost:8081/users")
        return data
      },{
        refetchInterval:1000
      })

      
      const query2 = useQuery('messages', async()=>{
        if(reciever.reciever_id != ""){
            //const data1 = await axios.get("http://localhost:8081/1/to/1");
            const {data} = await axios.get("http://localhost:8081/messages/from/" + user.phone_no + "/to/" + reciever.reciever_id);
            console.log(data)
            return data
        }
      },{
        refetchInterval:1000
      })

    return (
        <div>
            <div className="LeftDiv">
                {query1.data && <div>
                {query1.data.map((p,i)=>(<button key={p.phone_no} onClick={() => setReciever({reciever_id: p.phone_no, reciever_username: p.name})}>{p.name}</button>))} </div>}
            </div>
            <div className="rightDiv">
                <div className="chatWindow">
                {query2.data && <div>
                                {query2.data.map((p,i)=>(<li key={p.time}>{p.content}</li>))} </div>}
                </div>
                <form className="form-properties" onSubmit={handleSend}>
                
                    <div className="form-inner">
                        <div className="form-group">
                            <input type="text" name="name" id="name" onChange={e => setMessage({...message, content: e.target.value})} value={message.content}/>
                            <button className="sendbtn">Send</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
    
}
 
export default Chat;