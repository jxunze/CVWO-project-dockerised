// comments
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Comments = (prop) => {
  const handleDelete = (e) => {
    prop.delete(e.target.getAttribute("a-key"));
  };

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

  let now = new Date();
  let allComments = <p>No Comments</p>;
  if (prop.comments.length > 0) {
    allComments = prop.comments.map((comment, index) => (
      <div key={index} className="card-container">
        <div className="card">
          <div className="card-body">
            <div className="card-top-container">
              <h5 className="card-subtitle text-muted">
                {comment.user.username} | Posted{" "}
                {getTimeElapsed(comment.updated_at)} ago
              </h5>
              <Dropdown className="card-dropdown">
                <Dropdown.Toggle
                  className="card-dropdown"
                  variant="secondary"
                  size="sm"
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    a-key={comment.id}
                    onClick={handleDelete}
                    disabled={prop.user !== comment.user.username}
                  >
                    Delete Comment
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <h3 className="card-text">{comment.body}</h3>
          </div>
        </div>
      </div>
    ));
  }
  return <div>{allComments}</div>;
};

export default Comments;
