import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar.js";
import NewPost from "../components/postpage/NewPost";

const EditPostPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formInfo, setFormInfo] = useState({
    title: "",
    body: "",
  });

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
          setFormInfo({ title: response.title, body: response.body });
        })
        .catch((error) => console.log(error.message));
    }
  }, []);

  const onSubmit = (event, title, body) => {
    event.preventDefault();
    const url = `http://localhost:3000/posts/${params.id}`;

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
      method: "PUT",
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
        navigate("/home");
      })
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
            homepage={false}
          />
        </div>
      </main>
    </div>
  );
};
export default EditPostPage;
