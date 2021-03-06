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
        <button id="write-tab-button" className="selected" type="button">
          write tab
        </button>
        <button
          id="preview-tab-button"
          type="button"
          onClick={() => setIsPreview(true)}
        >
          preview tab
        </button>
      </>
      <>
        <textarea
          id="article-title-input"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="article-content-input"
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </>
      <>
        <button
          id="back-create-article-button"
          type="button"
          onClick={() => handleClickBack()}
        >
          back
        </button>
        <button
          id="confirm-create-article-button"
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
