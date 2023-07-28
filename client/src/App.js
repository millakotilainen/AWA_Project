import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AppContext from './Contexts/AppContext';
import Home from "./Pages/Home/Home";

import "./Components/Page/Page.css";
import "./Components/Form/Form.css";
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import CreateThread from './Pages/Thread/Create/CreateThread';
import HttpClient from './Services/HttpClient';
import "./CommonCss/List/List.css";
import ShowThread from './Pages/Thread/Show/ShowThread';

const App = () => {
  useEffect(() => {
    init();
  }, []);


  const [isInitiated, setIsInitiated] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
      setUser(null);
      localStorage.setItem("token", null);
  };

  const init = async () => {
    const {data} = await HttpClient().get('/api/user/init');
    setUser(data.user);
    setIsInitiated(true);
  };
  return (
    <div>
      {isInitiated && (
        <AppContext.Provider value={{user, setUser, logout}}>
          <Router>
            <Navbar/>
            <Switch>
              <Route exact path="/" >
                <Home/>
              </Route>
              <Route path='/thread/create'>
                {user ? <CreateThread/> : <Redirect to="/auth/login"/>}
              </Route>
              
              <Route path='/thread/:id'>
                  <ShowThread/>
              </Route>

              <Route path='/comment/create/:threadId'>
                  <ShowThread/>
              </Route>
             
              <Route path='/profile'>
                {user ? <Profile/> : <Redirect to="/auth/login"/>}
              </Route>
              
              <Route path="/auth/register">
                {!user ? <Register/> : <Redirect to="/"/>}
              </Route>

              <Route path="/auth/login">
                {!user ? <Login/> : <Redirect to="/"/>}
              </Route>

            </Switch>
          </Router>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
