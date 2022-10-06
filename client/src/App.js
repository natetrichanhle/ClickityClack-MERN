import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import axios from 'axios'

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

import Home from './views/Home'
import Sell from './views/Sell'
import Shop from './views/Shop';
import UpdateSell from './views/UpdateSell';
import ViewOneSell from './views/ViewOneSell';

function App() {
  const [user, setUser] = useState(null);

  useEffect (() => {
    axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials: true})
        .then(res => {
          setUser(res.data);
          console.log(res.data);
        })
        .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<SignupForm user={user} setUser={setUser}/>}/>
          <Route exact path='/login' element={<LoginForm user={user} setUser={setUser}/>}/>
          <Route exact path='/' element={<Home user={user}/>}/>
          <Route exact path='/sell' element={user? <Sell user={user}/> : <Navigate to='/login'/>} />
          <Route exact path='/sell/:id' element={<ViewOneSell user={user}/>} />
          <Route exact path='/sell/edit/:id' element={user ? <UpdateSell user={user}/> : <Navigate to='/login'/>} />
          <Route exact path='/shop' element={<Shop user={user}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

