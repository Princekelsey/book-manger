import React, { Component } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  state = {
    isAdded: false,
    isRemoved: false,
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
    const userData = {
      password: this.state.password,
      email: this.state.email
    };
    this.props.loginUser(userData);
  };

  render() {
    const { isAdded } = this.state;
    const { email, password } = this.state;
    const { errors } = this.state;

    return (
      <div
        className={`container2 wrapper ${isAdded ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container">
          <form noValidate onSubmit={this.handleSubmit}>
            <h1>Login To Your Account</h1>

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

            <button className="btn-login ">Sign In</button>
          </form>
        </div>
        <div className="form-container sign-in-container" />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left ">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              {/* <button className="ghost btn-login" onClick={this.removeClass}>
                Sign In
              </button> */}
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello Friend!</h1>
              <p>Enter your login details to access your account</p>
              <button className="ghost btn-login" onClick={this.addClass}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
