import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBookRecord } from "../../actions/profileActions";

class BookRecords extends Component {
  handleDelete = id => {
    this.props.deleteBookRecord(id);
  };
  render() {
    const bookrecord = this.props.bookrecord.map(record => (
      <tr key={record._id}>
        <td>{record.title}</td>
        <td>{record.author}</td>
        <td>{record.ISBN}</td>
        <td>{record.comment}</td>

        <td>
          <i
            className="fas fa-trash-alt text-danger"
            onClick={() => {
              this.handleDelete(record._id);
            }}
          />
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Book List</h4>
        <table className="table">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>ISBN</th>
              <th>COMMENT</th>
              <th />
              <th />
            </tr>
            {bookrecord}
          </thead>
        </table>
      </div>
    );
  }
}
BookRecords.propTypes = {
  deleteBookRecord: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteBookRecord }
)(BookRecords);
