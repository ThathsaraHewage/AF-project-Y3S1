
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import {BrowserRouter as Router,Route} from "react-router-dom"

function App() {
  return (
    <Router> 
      <div>
        <Navbar/>
        <Route path="/Signup" exact component ={Signup}/>     
      </div>
    </Router> 
  );
}

export default App;
