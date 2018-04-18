import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="login">

        <header>
        <h1>A.Beltran Fotocopiadoras</h1>
        <hr/>
        </header>
        <br/><br/>

        <div className="body">
        <h2>Login</h2>
        <input type="text" placeholder="Usuario" id="txtUsuario" size="35"></input><br/><br/>
        <input type="text" placeholder="Contraseña" id="txtPassword" size="35"></input><br/><br/>
        <input type="submit" value="Ingresar" id="btnEnviar"/>
        </div>

      </div>
    );
  }
}

export default App;
