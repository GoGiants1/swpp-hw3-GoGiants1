import React from 'react';
import './NewArticles.css';

function WriteTab({
  setIsPreview,
  title,
  content,
  setTitle,
  setContent,
  handlePost,
  handleClickBack,
}) {
  return (
    <div className="WriteTab">
      <>
        <button className="selected" type="button">
          write tab
        </button>
        <button type="button" onClick={() => setIsPreview(true)}>
          preview tab
        </button>
      </>
      <>
        <textarea
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </>
      <>
        <button type="button" onClick={() => handleClickBack()}>
          back
        </button>
        <button
          type="button"
          disabled={!title || !content}
          onClick={() => handlePost()}
        >
          confirm
        </button>
      </>
    </div>
  );
}

export default WriteTab;
