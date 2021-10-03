import React from 'react';
import './Article.css';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getArticle } from './articlesSlice';

function Article({ id, authorName, title }) {
  const dispatch = useDispatch();
  const handleClick = async () => {
    await dispatch(getArticle(id, authorName));
    dispatch(push(`/articles/${id}`));
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
