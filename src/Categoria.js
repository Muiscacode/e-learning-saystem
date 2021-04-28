import React, { Component } from "react";
import Exp from "./Components/Exp";
import Category from "./Components/Category";
import Card from "./Components/Card";

import { Link } from "react-router-dom";
import { db } from "./config";
import _ from "lodash";

class Categoria extends Component {
  state = {
    cat: this.props.location.state.cat,
    category: []
  };

  componentDidUpdate(prevProps, prevState) {
    window.scrollTo(0, 0);

    if (this.state.cat !== prevState.cat) {
      const ref = db
        .ref("posts/")
        .orderByChild("category")
        .equalTo(this.state.cat);
      ref.on("value", snap => {
        const state = _.map(snap.val());
        this.setState({
          category: state
        });
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const ref = db
      .ref("posts/")
      .orderByChild("category")
      .equalTo(this.state.cat);
    ref.on("value", snap => {
      const state = _.map(snap.val()); //usando lodash para transformar o objeto que vem do banco para array
      //console.log('state: ', state);
      this.setState({
        category: state
      });
    });
  }

  render() {
    const { cat, category } = this.state;
    return (
      <div>
        <div className="container mt-2">
          <div className="row mb-4">
            <div className="col-md-9">
              <h1 className="mb-5">{cat}</h1>
              {!category.length && (
                <div className="text-center mb-5">
                  <p>Nothing</p>
                </div>
              )}

              {category.map(cat => {
                return (
                  <div key={cat.id}>
                    <Card post={cat} />
                  </div>
                );
              })}
            </div>

            <div className="col-md-3 mt-3 mt-lg-0 mb-5">
              <h1 className="mt-5 mt-sm-0 mb-5 text-break">Category</h1>
              <Category />
              <h1 className="mt-5 mt-sm-5 mb-5 text-break">Technologies</h1>
              <Exp />
            </div>
          </div>
          <Link to="/">
            <button className="btn btn-outline-danger mb-4">Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Categoria;
