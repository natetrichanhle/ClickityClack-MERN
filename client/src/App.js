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
import Cart from './views/Cart';
import Orders from './views/Orders';

function App() {
  const [user, setUser] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect (() => {
    axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials: true})
        .then(res => {
          setUser(res.data);
        })
        .catch(err => console.log(err))
        setLoaded(true);
  }, [user])

  return (
    <div>
      {loaded && <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<Signup user={user} setUser={setUser}/>}/>
          <Route exact path='/login' element={<LoginForm user={user} setUser={setUser}/>}/>
          <Route exact path='/' element={<Home user={user} setUser={setUser}/>}/>
          <Route exact path='/shop' element={<Shop user={user} setUser={setUser}/>} />
          <Route exact path='/sell' element={user? <Sell user={user} setUser={setUser}/> : <Navigate to='/login'/>} />
          <Route exact path='/cart' element={user? <Cart user={user} setUser={setUser}/> : <Navigate to='/login'/>} />
          <Route exact path='/sell/:id' element={user ? <ViewOneSell user={user} setUser={setUser}/> : <Navigate to='/login'/>} />
          <Route exact path='/sell/edit/:id' element={user ? <UpdateSell user={user} setUser={setUser}/> : <Navigate to='/login'/>} />
          <Route exact path='/profile' element={user ? <Profile user={user} setUser={setUser}/> : <Navigate to='/login'/>} />
          <Route exact path='/posts' element={user ? <Post user={user} setUser={setUser}/> : <Navigate to='/login'/>} />
          <Route exact path='/orders' element={user ? <Orders user={user} setUser={setUser}/> : <Navigate to='/login'/>} />
          <Route exact path='/user/edit/:id' element={user ? <UpdateUser user={user} setUser={setUser}/> : <Navigate to='/login'/>}/>
        </Routes>
      </BrowserRouter>}
    </div>
  );
}
export default App;

