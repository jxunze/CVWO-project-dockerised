import React from "react";

const NewPost = (prop) => {
  const formInfo = prop.info;

  const onChange = (event) => {
    prop.onChange({
      ...prop.info,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event, title, body) => {
    prop.submit(event, title, body);
  };

  return (
    <div className="post-form-container">
      <form
        className="post-form"
        onSubmit={(event) => handleSubmit(event, formInfo.title, formInfo.body)}
      >
        {prop.homepage ? (
          <legend className="post-form-title">What's on your mind?</legend>
        ) : (
          <legend className="post-form-title">Edit Post</legend>
        )}

        <label className="form-label">Title</label>
        <input
          type="title"
          id="title"
          className="form-control"
          required
          value={formInfo.title}
          onChange={(event) => onChange(event)}
        />
        <label className="form-label">Body</label>
        <textarea
          type="body"
          id="body"
          className="form-control"
          required
          onChange={(event) => onChange(event)}
          value={formInfo.body}
        />
        <button
          type="submit"
          className="form-btn"
          disabled={!(formInfo.title && formInfo.body)}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
