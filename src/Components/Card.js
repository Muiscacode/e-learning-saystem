import React from "react";

import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card mb-4">
      <div className="card-header font-weight-bold">
        {props.post.title}
        <br />
        <small className="text-muted">{props.post.date}</small>&nbsp;
        <span className="badge badge-primary">{props.post.category}</span>
      </div>
      <div className="card-body">
        {
          //props.post.content[0].slice(0, 200)}...&nbsp;&nbsp;
        }
        <Link
          to={{
            pathname: "/Post",
            state: {
              poste: props.post
            }
          }}
        >
          <button className="btn btn-primary btn-sm  mb-2">View more</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
