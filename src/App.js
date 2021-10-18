import React from 'react';
import './App.css';
import Calendar from './Calendar';
import { LoginProvider } from './Context';
import Login from './Login';
import Logout from './Logout';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const toggleLogin = () =>
    setLoggedIn((loggedIn) => (loggedIn === false ? true : false));

  return (
    <div className='App'>
      <LoginProvider value={loggedIn}>
        <Login toggleLogin={toggleLogin} />
        <br />
        <Logout toggleLogin={toggleLogin} />
        {loggedIn && <Calendar />}
      </LoginProvider>
    </div>
  );
}

export default App;
