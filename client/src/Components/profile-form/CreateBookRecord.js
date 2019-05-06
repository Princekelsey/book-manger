import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputGroup from "../common/InputGroup";
import { addBookRecords } from "../../actions/profileActions";

class CreateBookRecord extends Component {
  state = {
    title: "",
    author: "",
    ISBN: "",
    comment: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newRecord = {
      title: this.state.title,
      author: this.state.author,
      ISBN: this.state.ISBN,
      comment: this.state.comment
    };
    this.props.addBookRecords(newRecord, this.props.history);
  };

  render() {
    const { title, errors, author, ISBN, comment } = this.state;
    return (
      <div className="create-bookrecord ">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className=" dispaly-4 text-center ">Add Book Record</h1>
              <p className="lead center text-center">
                keep record of your books
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <InputGroup
                  placeholder="* Book Title"
                  name="title"
                  icon="fas fa-book"
                  value={title}
                  onChange={this.handleChange}
                  error={errors.title}
                />
                <InputGroup
                  placeholder="* Book Author"
                  name="author"
                  icon="fas fa-at"
                  value={author}
                  onChange={this.handleChange}
                  error={errors.author}
                />
                <InputGroup
                  placeholder="* Book ISBN"
                  name="ISBN"
                  icon="fas fa-barcode"
                  value={ISBN}
                  onChange={this.handleChange}
                  error={errors.ISBN}
                />
                <InputGroup
                  placeholder="Add a comment"
                  name="comment"
                  icon="fas fa-comment"
                  value={comment}
                  onChange={this.handleChange}
                  error={errors.comment}
                />
                <input
                  type="submit"
                  className="btn btn-danger btn-block mt-4"
                  value="Add Book Record"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateBookRecord.propTypes = {
  addBookRecords: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBookRecords }
)(withRouter(CreateBookRecord));
