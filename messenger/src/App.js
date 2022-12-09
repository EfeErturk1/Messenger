import React, {useState} from "react";
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
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
  const [page, setPage] = useState({type: "login"});

  return (
    <div className="App">
      {user.phone_no == "" && <div>
        {page.type === "login" ?
          <Login setUser={setUser} setPage={setPage}/> :
          <Register setPage={setPage}/>
        }
        </div>}
      {user.phone_no != "" && <div>
        <Chat setUser={setUser} user={user}/>
      </div>}
    </div>
  );
}

export default App;
