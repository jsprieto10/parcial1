import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario1: "",
      usuario2: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    this.props.jugadores(this.state.usuario1, this.state.usuario2);
    event.preventDefault();
  }




  render() {
    return (
      <div className="container">
        <h2>Introduce dos nombre de usuarios</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="usuario1">Usuario 1</label>
              <input
                value={this.state.usuario1}
                type="text"
                className="form-control"
                id="usuario1"
                placeholder="alvarouribevelez"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="usuario2">Usuario 2</label>
              <input
                value={this.state.usuario2}
                type="text"
                className="form-control"
                id="usuario2"
                placeholder="duto_guerra"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <center>
            <button type="submit" className="btn btn-primary">
              Fight!
            </button>
          </center>
        </form>
      </div>
    );
  }
}
export default Form;
