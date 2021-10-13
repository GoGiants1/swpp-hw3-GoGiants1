import React from 'react';
import './NewArticles.css';

function EditWrite({
  setIsPreview,
  title,
  content,
  setTitle,
  setContent,
  handleEdit,
  handleClickBack,
}) {
  return (
    <div className="EditWrite">
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

export default EditWrite;
