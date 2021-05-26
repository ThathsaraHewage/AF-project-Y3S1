import { BrowserRouter as Router,Route} from "react-router-dom";
//import Home from './Components/Home/Home';
import React from 'react';
import Home from './Components/solid/home';
import Login from './Components/Auth/Login';

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component ={Home}/>
        <Route path="/login" exact component ={Login}/>
      </div>  
    </Router>
     
  );
}

export default App;
