import React from 'react';
import './Article.css';
import { useDispatch } from 'react-redux';
import { getArticle } from './articlesSlice';

function Article({ history, id, authorName, title }) {
  const dispatch = useDispatch();
  const handleClick = async () => {
    await dispatch(getArticle(id, authorName));
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
