import React from "react";
import "./user-detail.style.css";

const UserDetail = props => {
  const { data, handleDelete } = props;
  const { avatar, first_name, last_name, id } = data;
  return (
    <div className="card-body">
      <div className="wrapper">
        <img
          id="image_avatar"
          src={avatar}
          alt="PS"
          className="image--cover"
        />
      </div>
      <p className="display-name">{`${first_name} ${last_name}`} </p>
      <p
        className="button"
        onClick={e => handleDelete(id)}
      >
        <span>Delete </span>
      </p>
    </div>
  );
};

export default UserDetail;
