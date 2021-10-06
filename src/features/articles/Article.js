import React from 'react';
import './Article.css';

function Article({ history, id, authorName, title }) {
  const handleClick = () => {
    history.push(`/articles/${id}`);
  };
  return (
    <div className="article">
      <div>{id} </div>
      <div>{authorName} </div>
      <button type="button" onClick={() => handleClick()}>
        {title}
      </button>
    </div>
  );
}

export default Article;
