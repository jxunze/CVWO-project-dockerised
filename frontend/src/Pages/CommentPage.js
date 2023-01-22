// comments
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/commentpage/Comments";
import Navbar from "../components/NavBar.js";
import NewComment from "../components/commentpage/NewComment";
import Dropdown from "react-bootstrap/Dropdown";
import Post from "../components/commentpage/Post";

const CommentPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [orderIndex, setOrder] = useState(0);
  const [search, setSearch] = useState("");
  const order = ["Newest to oldest", "Oldest to newest"];
  const user = localStorage.getItem("username");

  useEffect(() => {
    let token = localStorage.getItem("token");
    const showPostURL = `http://localhost:3000/posts/${params.id}`;
    if (token) {
      fetch(showPostURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => {
          setPost(response);
          console.log(response);
        })
        .catch((error) => console.log(error.message));
    }
  }, []);

  useEffect(() => getComments(), [search, orderIndex]);

  const getComments = () => {
    const url = `http://localhost:3000/comments/${params.id}?order=${orderIndex}&search=${search}`;
    let token = localStorage.getItem("token");
    if (token) {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((res) => {
          setComments(res);
        })
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  };

  const handleOrder = (id) => {
    setOrder(id);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // const stripHtmlEntities = (str) => {
  //   return String(str)
  //     .replace(/\n/g, "<br> <br>")
  //     .replace(/</g, "&lt;")
  //     .replace(/>/g, "&gt;");
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `http://localhost:3000/comments`;

    if (newComment.length === 0) return;

    const info = {
      comment: {
        post_id: params.id,
        body: newComment,
      },
    };
    setNewComment("");

    let token = localStorage.getItem("token");
    if (token) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(info),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((res) => {
          getComments();
        })
        .catch((error) => console.log(error.message));
    }
  };

  const deleteComment = (id) => {
    const url = `http://localhost:3000/comments/${id}`;
    const auth_token = localStorage.getItem("token");
    console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/home");
          throw new Error("Unauthorised user.");
        }
      })
      .then(() => getComments())
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <Navbar user={localStorage.getItem("username")} />
      <main className="mainpage">
        <Post post={post} />
        <div className="new-post">
          <NewComment
            onSubmit={onSubmit}
            onChange={setNewComment}
            comment={newComment}
          />
        </div>
        <hr />
        <div className="container-row">
          <h3>Comments</h3>
          <form className="form-input">
            <input
              className="post-input"
              type="text"
              placeholder="Search here"
              onChange={handleSearch}
              value={search}
            />
          </form>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              {order[parseInt(orderIndex)]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleOrder(0)}>
                Newest to oldest
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOrder(1)}>
                Oldest to newest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <br />
        <Comments comments={comments} delete={deleteComment} user={user} />
      </main>
    </div>
  );
};

export default CommentPage;
