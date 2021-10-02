import React from 'react';
import './Article.css';

function Article({ id, authorName, title }) {
  return (
    <div className="article">
      <div>article id: {id} </div>
      <div>authorName: {authorName} </div>
      <button type="button"> {title} </button>
    </div>
  );
}

export default Article;
