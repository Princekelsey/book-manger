import React, { Component } from "react";

class ProfileBook extends Component {
  render() {
    const { bookrecord } = this.props;
    const bookItems = bookrecord.map(book => (
      <li key={book._id} className="list-group-item list-group-horizontal-sm">
        <h5>Book Title</h5>
        <p>{book.title}</p>
        <h5>Book Author</h5>
        <p>{book.author}</p>
        <h5>Book ISBN</h5>
        <p>{book.ISBN}</p>
        <h5>Comment</h5>
        <p>{book.comment === "" ? null : <span>{book.comment}</span>}</p>
      </li>
    ));
    return (
      <div className="container bg-dark">
        <div className="row ">
          <div className="col-md text-center ">
            <h3 className="text-center text-white"> Book List Item</h3>
            {bookItems.length > 0 ? (
              <ul className="list-group  ">{bookItems}</ul>
            ) : (
              <p> No Book Record Added</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileBook;
