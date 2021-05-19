import React, { Component } from "react";

import "./sign.css";

import { Link } from "react-router-dom";
import { auth } from "./config";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: ""
      });
      this.props.history.push("/");
    } catch (error) {
      alert(error.message);
      this.setState({
        password: ""
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Ingreso</h5>
            <div className="form-label-group">
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <label>Email </label>
                <input
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <label>Password </label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <label></label>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Ingresar
                </button>
                <Link to={"/Register"}> Registrarse </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
