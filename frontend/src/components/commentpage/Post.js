import React from "react";

const Post = (prop) => {
  let now = new Date();

  const getTimeElapsed = (time) => {
    const d = new Date(time);
    const elapsed = now - d;
    if (elapsed < 3600000) {
      return `${Math.floor(elapsed / 60000)} min`;
    }
    if (elapsed < 86400000) {
      return `${Math.floor(elapsed / 3600000)} h`;
    } else {
      return `${Math.floor(elapsed / 86400000)} days`;
    }
  };

  let res = <div></div>;

  if (prop.post.user) {
    res = (
      <div className="card-comment">
        <div className="card-body">
          <h5 className="card-subtitle text-muted">
            {prop.post.user.username} | Posted{" "}
            {getTimeElapsed(prop.post.updated_at)} ago
          </h5>
          <h5 className="card-title-comment">{prop.post.title}</h5>
          <h5 className="card-text-comment">{prop.post.body}</h5>
        </div>
      </div>
    );
  }
  return <div>{res}</div>;
};

export default Post;
