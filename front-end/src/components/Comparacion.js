import React from "react";

class Comparacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user1: props.usuario1.user,
      user2: props.usuario2.user,
      likes1: 0,
      likes2: 0
    };
  }

  post(data) {
    fetch("api/postPartida", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(function(res) {
        return res.json();
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    let lista1 = this.state.user1.media.nodes;
    let li1 = this.getSumaTotal(lista1);
    this.setState({ likes1: li1 });
    let lista2 = this.state.user2.media.nodes;
    let li2 = this.getSumaTotal(lista2);
    this.setState({ likes2: li2 });
  }

  componentDidUpdate() {
    let winner = this.winner();
    let loser = this.loser();
    let body = {
      winner: {
        full_name: winner.full_name,
        user_name: winner.username,
        likes: this.getSumaTotal(winner.media.nodes),
        profile_pic: winner.profile_pic_url
      },
      loser: {
        full_name: loser.full_name,
        user_name: loser.username,
        likes: this.getSumaTotal(loser.media.nodes),
        profile_pic: loser.profile_pic_url
      }
    };
    this.post(body);
  }

  getSumaTotal(lista) {
    let x = lista.map(r => r.likes.count);
    return x.reduce((a, b) => a + b);
  }

  winner() {
    if (this.state.likes1 >= this.state.likes2) return this.state.user1;
    else return this.state.user2;
  }

  loser() {
    if (this.state.likes1 < this.state.likes2) return this.state.user1;
    else return this.state.user2;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h3>{this.state.user1.full_name}</h3>
            <h4>@{this.state.user1.username}</h4>
            <img
              src={this.state.user1.profile_pic_url}
              className="rounded-circle"
            />
            <h2>
              {this.state.likes1} <i className="fas fa-heart" />
            </h2>
          </div>
          <div className="col-md-6">
            <h3>{this.state.user2.full_name}</h3>
            <h4>@{this.state.user2.username}</h4>
            <img
              src={this.state.user2.profile_pic_url}
              className="rounded-circle"
            />
            <h2>
              {this.state.likes2} <i className="fas fa-heart" />
            </h2>
          </div>
        </div>
        <center>
          <div>
            <h1>El ganador es</h1>
            <h3>{this.winner().full_name}</h3>
          </div>
        </center>
      </div>
    );
  }
}

export default Comparacion;
