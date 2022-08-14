 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './App.css';
import { 
  BrowserRouter as Router, 
} from "react-router-dom";
import Routers from "./Routers"
import Navbar from './component/NavBar/Navbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
function App() { 
  return (
    <><div className="App">
      <Router>
        <Navbar />
        <Routers />
        {/* <Footer /> */}   
      </Router>
      <ToastContainer />
    </div></>
  );
}

export default App;
