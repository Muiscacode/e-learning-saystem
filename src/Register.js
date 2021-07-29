import React from "react";
import { auth, createUserProfileDatabase } from "./config";

import "./sign.css";

const superRol = "expediciones";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rol: "",
      company: "",
      authImpulsor: false
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword, rol } = this.state;

    if (password !== confirmPassword) {
      alert("The passwords do not match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      //createUserProfileDocument(user, { displayName, rol });
      createUserProfileDatabase(user, { displayName, rol });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        company: "",
        rol: ""
      });
      this.props.history.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      company,
      rol
    } = this.state;

    return (
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h2 className="title">Usuario nuevo.</h2>
            <div className="form-label-group">
              <form className="sign-in" onSubmit={this.handleSubmit}>
                <label>Usuario </label>
                <input
                  className="form-control"
                  type="text"
                  name="displayName"
                  value={displayName}
                  onChange={this.handleChange}
                  required
                />
                <label>Email </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  label="Email"
                  onChange={this.handleChange}
                  required
                />
                <label>Password </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  label="Password"
                  onChange={this.handleChange}
                  required
                />
                <label>Confirmar Password </label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  label="Confirm Password"
                  onChange={this.handleChange}
                  required
                />
                <label> Compañia </label>
                <input
                  className="form-control"
                  type="text"
                  name="company"
                  value={company}
                  label="Compañia"
                  onChange={this.handleChange}
                />
                <label> Rol </label>
                <select
                  className="form-control select-form"
                  name="rol"
                  value={rol}
                  onChange={this.handleChange}
                >
                  <option defaultValue="Rol"> </option>
                  <option value="Agente">Agente</option>
                  {this.state.company === superRol ? (
                    <option value="Impulsor">Impulsor</option>
                  ) : (
                    ""
                  )}
                </select>

                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Registro
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
