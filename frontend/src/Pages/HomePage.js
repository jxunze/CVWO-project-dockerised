import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../components/postpage/Posts";
import Navbar from "../components/NavBar.js";
import NewPost from "../components/postpage/NewPost";
import Dropdown from "react-bootstrap/Dropdown";

const HomePage = () => {
  let navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    title: "",
    body: "",
  });

  const order = ["Newest to oldest", "Oldest to newest"];
  const [posts, setPosts] = useState([]);
  const [orderIndex, setOrder] = useState(0);
  const [search, setSearch] = useState("");
  const user = localStorage.getItem("username");

  const getPosts = () => {
    const url = `http://localhost:3000/posts?order=${orderIndex}&search=${search}`;
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
          setPosts(res);
        })
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => getPosts(), [search, orderIndex]);

  const onSubmit = (event, title, body) => {
    event.preventDefault();
    const url = "http://localhost:3000/posts";

    if (title.length === 0 || body.length === 0) return;
    const info = {
      post: {
        title,
        body: body,
      },
    };
    setFormInfo({
      title: "",
      body: "",
    });

    const auth_token = localStorage.getItem("token");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify(info),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        getPosts();
      })
      .catch((error) => console.log(error.message));
  };

  // const stripHtmlEntities = (str) => {
  //   return String(str)
  //     .replace(/\n/g, "<br> <br>")
  //     .replace(/</g, "&lt;")
  //     .replace(/>/g, "&gt;");
  // };

  const handleOrder = (id) => {
    setOrder(id);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const deletePost = (id) => {
    const url = `http://localhost:3000/posts/${id}`;
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
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => getPosts())
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <Navbar user={localStorage.getItem("username")} />
      <main className="mainpage">
        <div className="new-post">
          <NewPost
            submit={onSubmit}
            onChange={setFormInfo}
            info={formInfo}
            homepage={true}
          />
        </div>
        <hr className="hr" />
        <div className="container-row">
          <h3>Posts</h3>
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
        <Posts posts={posts} delete={deletePost} user={user} />
      </main>
    </div>
  );
};

export default HomePage;
