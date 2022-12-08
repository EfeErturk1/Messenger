import React, {useState} from "react";
import Login from './components/Login';
import './App.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import axios from 'axios'

function App() { 
  const [user, setUser] = useState({username: "", phone_no: ""});

     const query = useQuery('users', async()=>{
       const {data} = await axios.get("http://localhost:8081/users")
       return data
     },{
       refetchInterval:1000
       
     })
  const mutation = useMutation(async(newTodo )=> {
     return await axios.post("http://localhost:3001/posts",{
       id:newTodo.id,
       title:newTodo.title,
       author:newTodo.author
     })
   })
  return (
    <div className="App">
      <div>
        {query.isLoading && <h1>Loading....</h1>}
        {query.data && <div>
          {query.data.map((p,i)=>(<li>{p.name} = {p.phone_no}</li>))}

        </div>}
        <button
        onClick={()=>{
          mutation.mutate({id:query.data.length+1,title:"bayu",author:"write test"})
        }}>add new data</button>
      </div>
      {user.phone_no == "" && <div>
          <Login />
        </div>}
    </div>
  );
}

export default App;
