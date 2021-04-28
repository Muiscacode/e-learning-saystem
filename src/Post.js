import React, { Component } from "react";
import Comment from "./Components/Comment";
import Category from "./Components/Category";
import "./Post.css";

import { db, auth } from "./config";
import _ from "lodash";
import HTMLReactParser from "html-react-parser";

class Post extends Component {
  state = {
    post: this.props.location.state.poste,
    comments: [],
    id: this.props.location.state.poste.id,
    click: false,
    currentUser: "",
    currentRol: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const ref = db.ref("comments/" + this.state.id);
    ref.on("value", (snap) => {
      const state = _.map(snap.val()); //usando lodash para transformar o objeto que vem do banco para array
      //console.log('state: ', state);
      this.setState({
        comments: state
      });
    });

    const authUser = auth.currentUser;
    if (authUser) {
      this.setState({
        currentUser: authUser.uid
      });
    }
    if (authUser) {
      const userRef = db.ref("users/" + authUser.uid);
      userRef.on("value", (snap) => {
        this.setState({
          currentRol: snap.child("rol").val()
        });
      });
    }
  }

  Click = () => {
    this.setState({ click: !this.state.click });
  };

  handleDelete = (id) => {
    if (window.confirm("Eliminar aporte")) {
      const ref = db.ref("comments/" + this.state.id);
      ref.child(id).remove();
    }
  };

  render() {
    const { post, click, comments } = this.state;
    let icone = click ? "fas fa-chevron-up" : "fas fa-chevron-down";
    return (
      <div>
        <div className="container mt-2">
          <div className="row mb-4">
            <div className="col-md-9 ">
              <div>
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-column m-0 p-0">
                    <h1 className="m-0 p-0">{post.title}</h1>
                    <p className="mb-5 m-0 p-0">
                      <small className="text-muted h6">{post.date}</small>
                    </p>
                  </div>
                  <div>
                    <h5 className="mt-2">
                      <span className="badge badge-primary">
                        {post.category}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
              {post.url && (
                <div className="container">
                  <div className="row justify-content-center">
                    <img
                      src={post.url}
                      className="img-fluid mb-4 justify-content-center imgCSS"
                      alt=""
                    />
                  </div>
                </div>
              )}
              <div className="border mb-2 p-1">
                {HTMLReactParser(post.content)}
              </div>
              {/* <iframe
                title="Webview"
                style={{ width: "100%", height: 200, marginTop: 20 }}
                srcDoc={post.content}
              /> */}
              <div className="mt-5">
                <div className="mb-2 d-flex flex-row align-items-center">
                  <h4>Aportes&nbsp;</h4>
                  <a
                    className="text-decoration-none text-primary"
                    data-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    onClick={this.Click}
                  >
                    <i className={`${icone}`}></i>
                  </a>
                </div>

                <div className="collapse mb-3 bg-light" id="collapseExample">
                  {comments.map((map) => {
                    return (
                      <div
                        className="card card-body color border-top-0 rounded-0 border-white"
                        key={map.idC}
                      >
                        <h6 className="card-title d-flex bd-highlight mb-3 align-middle">
                          {map.autor}:&nbsp;
                          <small className="text-muted mr-auto p-2 bd-highlight">
                            {map.date}
                          </small>
                          {this.state.currentUser === map.userID ||
                          this.state.currentRol === "Impulsor" ? (
                            <button
                              className="fa fa-trash ml-auto p-2 bd-highlight border-0"
                              onClick={this.handleDelete.bind(this, map.idC)}
                            ></button>
                          ) : (
                            <span></span>
                          )}
                        </h6>
                        <div className="card-text mt-2">
                          {HTMLReactParser(map.comentario)}
                        </div>
                      </div>
                    );
                  })}

                  {!comments.length && (
                    <div className="card card-body color border-top-0 rounded-0 border-white">
                      <h6 className="card-title m-0 p-0">
                        Aun no hay aportes...
                      </h6>
                    </div>
                  )}
                </div>

                <Comment id={post.id} />
              </div>
            </div>

            <div className="col-md-3 mt-3 mt-lg-0 mb-5">
              <h3 className="mt-5 mt-sm-0 mb-5 text-break">Categoria</h3>
              <Category />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
