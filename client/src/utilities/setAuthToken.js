import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // apply it to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
