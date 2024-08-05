import logo from "./logo.svg";
import "./App.scss";
import Login from "./component/Auth/Login/Login";
import Begin from "./component/Auth/Begin/Begin";
import Signup from "./component/Auth/Signup/Signup";
import Navbar from "./component/Navbar/Navbar";
import React from 'react';
function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Navbar className="Navbar"/>
    </div>
  );
}

export default App;
