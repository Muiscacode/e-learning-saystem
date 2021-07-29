import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import Nav from "./Components/Nav";
import Jumbo from "./Components/Jumbo";
import Footer from "./Components/Footer";
import Post from "./Post";
import Login from "./Login";
import Register from "./Register";
import Categoria from "./Categoria";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

const categorias = [
  "Boyaca",
  "Meta",
  "Tolima",
  "Otros",
  "Ciencia y tecnologia"
];

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Nav />
      <Jumbo />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/NewPost" component={NewPost} />
        <Route path="/EditPost" component={EditPost} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/Post" component={Post} />
        {categorias.map((cat, id) => {
          return <Route key={id} path={`/${cat}`} component={Categoria} />;
        })}
      </Switch>
      <Footer />
    </Router>
  </Provider>,
  document.getElementById("root")
);
