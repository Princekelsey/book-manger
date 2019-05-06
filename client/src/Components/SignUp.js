import React, { Component } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authActions";

class SignUp extends Component {
  state = {
    isAdded: false,
    isRemoved: false,
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  addClass = e => {
    e.preventDefault();
    this.setState({ isAdded: true, isRemoved: false });
  };

  removeClass = e => {
    e.preventDefault();
    this.setState({ isAdded: false, isRemoved: true });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { isAdded } = this.state;
    const { name, email, password, password2 } = this.state;
    const { errors } = this.state;

    return (
      <div
        className={`container2 wrapper ${isAdded ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container">
          <form noValidate onSubmit={this.handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
              className={classnames("form-control  ", {
                "is-invalid": errors.name
              })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={this.handleChange}
              className={classnames("form-control ", {
                "is-invalid": errors.email
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <small className="form-text text-muted">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className={classnames("form-control  ", {
                "is-invalid": errors.password
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={this.handleChange}
              className={classnames("form-control ", {
                "is-invalid": errors.password2
              })}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
            <button className="btn-login ">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container " />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Friend!</h1>
              <p>Create an account to start your experience</p>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello Friend!</h1>
              <p>
                Enter your personal details and start your amazing experience
              </p>
              <button className="ghost btn-login" onClick={this.addClass}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));
