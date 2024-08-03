import logo from "./logo.svg";
import "./App.scss";
import Login from "./component/Auth/Login/Login";
import Begin from "./component/Auth/Begin/Begin";
import Signup from "./component/Auth/Signup/Signup";
function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Signup />
    </div>
  );
}

export default App;
