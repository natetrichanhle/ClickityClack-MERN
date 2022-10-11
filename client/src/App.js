import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import axios from 'axios'

import LoginForm from './components/LoginForm';

import Home from './views/Home'
import Sell from './views/Sell'
import Shop from './views/Shop';
import UpdateSell from './views/UpdateSell';
import ViewOneSell from './views/ViewOneSell';
import Profile from './views/Profile';
import Post from './views/Posts';
import Signup from './views/Signup';
import UpdateUser from './views/UpdateUser';

function App() {
  const [user, setUser] = useState(null);

  useEffect (() => {
    axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials: true})
        .then(res => {
          setUser(res.data);
        })
        .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<Signup user={user} setUser={setUser}/>}/>
          <Route exact path='/login' element={<LoginForm user={user} setUser={setUser}/>}/>
          <Route exact path='/' element={<Home user={user}/>}/>
          <Route exact path='/shop' element={<Shop user={user}/>} />
          <Route exact path='/sell' element={user? <Sell user={user}/> : <Navigate to='/login'/>} />
          <Route exact path='/sell/:id' element={user ? <ViewOneSell user={user}/> : <Navigate to='/login'/>} />
          <Route exact path='/sell/edit/:id' element={user ? <UpdateSell user={user}/> : <Navigate to='/login'/>} />
          <Route exact path='/profile' element={user ? <Profile user={user}/> : <Navigate to='/login'/>} />
          <Route exact path='/posts' element={user ? <Post user={user}/> : <Navigate to='/login'/>} />
          <Route exact path='/user/edit/:id' element={<UpdateUser user={user} setUser={setUser}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

