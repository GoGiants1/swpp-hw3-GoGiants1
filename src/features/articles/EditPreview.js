import React from 'react';
import './NewArticles.css';

function EditPreview({
  setIsPreview,
  title,
  content,
  handleEdit,
  handleClickBack,
  authorName,
}) {
  return (
    <div className="EditPreview">
      <>
        <button
          id="write-tab-button"
          type="button"
          onClick={() => setIsPreview(false)}
        >
          write tab
        </button>
        <button id="preview-tab-button" className="selected" type="button">
          preview tab
        </button>
      </>
      <>
        <h1 id="article-title">{title}</h1>
        <h3 id="article-author">{authorName}</h3>
        <p id="article-content">{content}</p>
      </>
      <>
        <button
          id="back-edit-article-button"
          type="button"
          onClick={() => handleClickBack()}
        >
          back
        </button>
        <button
          id="confirm-edit-article-button"
          type="button"
          disabled={!title || !content}
          onClick={() => handleEdit()}
        >
          confirm
        </button>
      </>
    </div>
  );
}

export default EditPreview;
