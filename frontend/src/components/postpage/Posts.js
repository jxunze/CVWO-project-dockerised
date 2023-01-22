import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Posts = (prop) => {
  const navigate = useNavigate();
  let now = new Date();

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

  const allPosts = prop.posts.map((post, index) => (
    <div key={index} className="card-container">
      <div className="card">
        <div className="card-body">
          <div className="card-top-container">
            <h5 className="card-subtitle text-muted">
              {post.user.username} | Posted {getTimeElapsed(post.updated_at)}{" "}
              ago
            </h5>
            <Dropdown className="card-dropdown">
              <Dropdown.Toggle
                className="card-dropdown"
                variant="secondary"
                size="sm"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  a-key={post.id}
                  onClick={() => navigate(`/post/update/${post.id}`)}
                  disabled={post.user.username !== prop.user}
                >
                  Edit Post
                </Dropdown.Item>
                <Dropdown.Item
                  a-key={post.id}
                  onClick={handleDelete}
                  disabled={post.user.username !== prop.user}
                >
                  Delete Post
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <h3 className="card-title">
            <a href={`/post/${post.id}`}>{post.title}</a>
          </h3>
        </div>
      </div>
    </div>
  ));
  const noPost = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>No posts.</h4>
    </div>
  );

  return <div>{prop.posts.length > 0 ? allPosts : noPost}</div>;
};

export default Posts;
