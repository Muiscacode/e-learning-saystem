import React, { Component } from "react";
import Card from "./Components/Card";
import Category from "./Components/Category";
import "./App.css";
import { db, auth } from "./config";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import _ from "lodash";

class App extends Component {
  unsubscribeFromAuth = null;

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = db.ref("users").child(userAuth.uid);
        userRef.once("value").then(function (snapshot) {
          setCurrentUser({
            id: snapshot.key,
            ...snapshot.child()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    const ref = db.ref().child("posts");
    ref.on("value", (snap) => {
      const state = _.map(snap.val()); //usando lodash para transformar o objeto que vem do banco para array
      //console.log('state: ', state);
      this.setState({
        posts: state.reverse()
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-9">
              <h1 className="mb-5">Posts</h1>
              {!posts.length && (
                <div className="text-center mb-5">
                  <div
                    className="spinner-border maior"
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              )}

              {posts.map((post) => {
                return (
                  <div key={post.id}>
                    <Card post={post} />
                  </div>
                );
              })}
            </div>
            <div className="col-md-3 mb-5">
              <h3 className="mb-5 text-break">Category</h3>
              <Category />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
