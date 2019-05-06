import React, { Component } from "react";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = `${dd} -  ${mm} - ${yyyy}`;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-danger text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt={profile.user.name}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">@{profile.handle}</p>
              <p className="lead text-center">{today}</p>
              {/* <p>
                <a className="text-white p-2" href="#">
                  <i className="fas fa-globe fa-2x" />
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-twitter fa-2x" />
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-facebook fa-2x" />
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-linkedin fa-2x" />
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-instagram fa-2x" />
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
