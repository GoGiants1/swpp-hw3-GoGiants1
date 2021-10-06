import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditPreview from './EditPreview';
import EditWrite from './EditWrite';
import './NewArticles.css';
import { putArticle, selectSelectedArticle } from './articlesSlice';
import { selectThisUser } from '../user/userSlice';

function ArticleEdit({ history, match }) {
  const dispatch = useDispatch();
  const articleID = Number(match.params.id);
  const author = useSelector(selectThisUser);
  const article = useSelector(selectSelectedArticle);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const handleClickBack = () => {
    if (article.title === title && article.content === content) {
      history.push(`/articles/${articleID}`);
    } else {
      const res = window.confirm('Are you sure? The change will be lost');
      if (res) {
        history.push(`/articles/${articleID}`);
      }
    }
  };

  const handleEdit = () => {
    const newArticle = {
      ...article,
      title,
      content,
    };
    dispatch(putArticle(newArticle));
  };

  return (
    <div className="WrapperEdit">
      {isPreview ? (
        <EditPreview
          isPreview={isPreview}
          authorName={author.name}
          setIsPreview={setIsPreview}
          title={title}
          content={content}
          handleEdit={handleEdit}
          handleClickBack={handleClickBack}
        />
      ) : (
        <EditWrite
          setIsPreview={setIsPreview}
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          handleEdit={handleEdit}
          handleClickBack={handleClickBack}
        />
      )}
    </div>
  );
}

export default ArticleEdit;
