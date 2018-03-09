import React from "react";

class ListaHistorico extends React.Component {
  render() {
    return (
      <div>
        <h3>Datos historicos</h3>
        <div className="row">
          {this.props.historico.map(r => {
            return (
              <div key={r._id} className="col-md-6">
                <p>
                  {r.winner.full_name} vs {r.loser.full_name}
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <a
                      href={"http://instagram.com/" + r.winner.user_name}
                      target="__blank"
                    >
                      <img
                        src={r.winner.profile_pic}
                        className="rounded-circle"
                      />
                    </a>
                    <h4>Ganadoor!</h4>
                  </div>
                  <div className="col-md-6">
                    <a
                      href={"http://instagram.com/" + r.loser.user_name}
                      target="_blank"
                    >
                      <img
                        src={r.loser.profile_pic}
                        className="rounded-circle"
                      />
                    </a>
                    <h4>Perdedor</h4>
                  </div>
                </div>
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default ListaHistorico;
