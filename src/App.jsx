import React from "react";
import imagen from "./image/logodts1.png";
import "./index.css";
import { Route, Routes} from 'react-router-dom';
import Galeria from "./galeria";
import Home from "./home";
import Form from "./form"

export function App() {
  return (
    <div>
      <div  className="header">
        <a className="navbar-brand " href="/">
            
            <img
              src={imagen}
              alt="Logo"
              width="130"
              height="124"
              className="d-inline-block align-text-top"
            ></img>
          
        </a>
      <nav className="navbar">
        <div className="container-fluid">
        <h1>7°B</h1>
        </div>
      </nav>

        <a href="https://sway.cloud.microsoft/67nEBAFGBAXE42gD?ref=Link" class="boton1 btn btn-primary btn-lg">Tutorial</a>
        
      </div>
      {/* TODO: - base de datos
                - crear componente taskDetail
                - crear boton taskUpdate dentro de la tarea*/}
      
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/galeria/:id" Component={Galeria}/>
        <Route path="/formulario" Component={Form}/>
      </Routes>
    </div>
  );
}


