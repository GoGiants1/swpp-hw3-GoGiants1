import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preview from './PreviewTab';
import Write from './WriteTab';
import './NewArticles.css';
import { postArticle } from './articlesSlice';
import { selectThisUser } from '../user/userSlice';
// preview tab, writetab 2개로 이루어짐
function NewArticle({ history }) {
  const author = useSelector(selectThisUser);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleClickBack = () => {
    history.push('/articles');
  };

  const handlePost = () => {
    const newArticle = {
      author_id: author.id,
      title,
      content,
    };
    dispatch(postArticle(newArticle));
  };

  return (
    <div className="WrapperNew">
      {isPreview ? (
        <Preview
          isPreview={isPreview}
          authorName={author.name}
          setIsPreview={setIsPreview}
          title={title}
          content={content}
          handlePost={handlePost}
          handleClickBack={handleClickBack}
        />
      ) : (
        <Write
          setIsPreview={setIsPreview}
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          handlePost={handlePost}
          handleClickBack={handleClickBack}
        />
      )}
    </div>
  );
}

export default NewArticle;
