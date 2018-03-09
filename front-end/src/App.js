import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form.js";
import Comparacion from "./components/Comparacion.js";
import ListaHistorico from "./components/ListaHistorico.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      usuario1: null,
      usuario2: null,
      historico: [],
    };
  }

  componentDidMount(){
    //this.update();
  }

  update(){
    fetch("/api")
      .then(res => {
        return res.json();
      })
      .then(historia => this.setState({ historico: historia }))
      .catch(err => console.log(err));
  }

  getData1(nombre, usuario) {
    let url = "https://www.instagram.com/" + nombre + "/?__a=1";
    console.log(url);
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(usuario => this.setState({ usuario1: usuario }));
  }

  getData2(nombre, usuario) {
    let url = "https://www.instagram.com/" + nombre + "/?__a=1";
    console.log(url);
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(usuario => this.setState({ usuario2: usuario }));
  }

  jugadores(jugador1, jugador2) {
    this.setState({ usuario1: null });
    this.setState({ usuario2: null });
    console.log(jugador1, jugador2);
    this.getData1(jugador1);
    this.getData2(jugador2);
    this.update();
  }

  comparar() {
    if (this.state.usuario1 != null && this.state.usuario2 != null) {
      return (
        <Comparacion
          usuario1={this.state.usuario1}
          usuario2={this.state.usuario2}
        />
      );
    } else return <p />;
  }

  render() {
    return (
      <div className="App">
        <Form jugadores={this.jugadores.bind(this)} />
        {this.comparar()}
        <ListaHistorico historico={this.state.historico}/>
      </div>
    );
  }
}

export default App;
