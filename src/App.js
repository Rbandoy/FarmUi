 
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
import { ScrollContainer, ScrollPage } from "react-scroll-motion";

function App() { 
  return (
    <><div className="App">
      <Router>
        <Navbar />
        <ScrollContainer> 
            <Routers /> 
        </ScrollContainer> 
      </Router>
      <ToastContainer />
    </div></>
  );
}

export default App;
