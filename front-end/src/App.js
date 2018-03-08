import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      usuario1: "",
      usuario2: ""
    };
  }

  getData(nombre, usuario) {
    let url = "https://www.instagram.com/" + nombre / +"?__a=1";
    fetch("url")
      .then(res => {
        return res.json();
      })
      .then(usuario => this.setState({ [usuario]: usuario }));
  }

  jugadores(jugador1, jugador2) {
    this.getData(jugador1, "usuario1");
    this.getData(jugador2, "usuario2");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Insgram fight</h1>
        </header>
        <Form />
      </div>
    );
  }
}

export default App;
