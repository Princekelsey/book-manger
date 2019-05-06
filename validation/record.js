const Validator = require("validator");
const isEmpty = require("./isInputEmpty");

module.exports = function validateRecordInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.ISBN = !isEmpty(data.ISBN) ? data.ISBN : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Book title is required";
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = "Book author is required";
  }

  if (Validator.isEmpty(data.ISBN)) {
    errors.ISBN = "Book ISBN is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
