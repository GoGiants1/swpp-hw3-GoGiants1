import React from 'react';

function PreviewTab({
  setIsPreview,
  title,
  content,
  handlePost,
  handleClickBack,
}) {
  return (
    <div className="PreviewTab">
      <>
        <button type="button" onClick={() => setIsPreview(false)}>
          write tab
        </button>
        <button className="selected" type="button">
          preview tab
        </button>
      </>
      <>
        <h2>{title}</h2>
        <p>{content}</p>
      </>
      <>
        <button type="button" onClick={() => handleClickBack()}>
          back
        </button>
        <button type="button" onClick={() => handlePost()}>
          confirm
        </button>
      </>
    </div>
  );
}

export default PreviewTab;
