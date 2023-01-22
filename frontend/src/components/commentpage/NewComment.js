import React from "react";

const NewComment = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={(event) => props.onSubmit(event)}>
        <div className="form-floating">
          <input
            type="body"
            id="body"
            className="form-control"
            required
            onChange={(event) => onChange(event)}
            value={props.comment}
            placeholder=""
          />
          <label className="form-label">Comment...</label>
        </div>
        <button type="submit" className="form-btn" disabled={!props.comment}>
          Post
        </button>
      </form>
    </div>
  );
};

export default NewComment;
