import { BrowserRouter as Router,Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Header from './Components/Header';
import Login from './Components/Login';

function App() {
  return (
    
    <Router>
      <div>
        <Navbar/>
        <Route path="/login" exact component ={Login}/>
        <Route path="/signup" exact component ={Signup}/>
        <Route path="/home" exact component ={Header}/>
        
      </div>  
    </Router>
     
  );
}

export default App;
