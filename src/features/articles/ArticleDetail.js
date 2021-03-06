/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, selectThisUser, putUser } from '../user/userSlice';
import Comments from '../comments/Comments';
import { deleteArticle, getArticle } from './articlesSlice';

function ArticleDetail({ history, match }) {
  const dispatch = useDispatch();
  const articleID = Number(match.params.id);
  const users = useSelector(selectUsers);
  const thisUser = useSelector(selectThisUser);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // eslint-disable-next-line consistent-return
  const findUserNameByID = (id) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === id) return users[i].name;
    }
    // return null;
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await axios.get(`/api/articles/${articleID}`);
        const author = findUserNameByID(res.data.author_id);
        setAuthorName(author);
        setTitle(res.data.title);
        setContent(res.data.content);
        if (thisUser.id === res.data.author_id) setIsAuthor(true);
      } catch (e) {
        console.error(e);
      }
    }

    if (loading) {
      fetchArticle();
      setLoading(false);
    }
    return () => setLoading(true);
  }, []);

  const handleBack = () => {
    history.push(`/articles`);
  };

  const handleArticleEdit = async () => {
    try {
      await dispatch(getArticle(articleID, authorName));
      history.push(`/articles/${articleID}/edit`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleArticleDelete = () => {
    dispatch(deleteArticle(articleID));
  };

  const handleLogout = (user) => {
    dispatch(putUser({ ...user, logged_in: false }));
  };

  return (
    <div>
      <div>
        <h1 id="article-title">{title}</h1>
        <p id="article-author">{authorName}</p>
        <p id="article-content">{content}</p>
      </div>
      <Comments
        findUserNameByID={findUserNameByID}
        thisArticleID={articleID}
        thisUserID={thisUser.id}
      />
      {isAuthor ? (
        <div className="ArticleButtons">
          <button
            id="edit-article-button"
            type="button"
            onClick={() => handleArticleEdit()}
          >
            edit article
          </button>
          <button
            id="delete-article-button"
            type="button"
            onClick={() => handleArticleDelete()}
          >
            delete article
          </button>
        </div>
      ) : null}
      <button
        id="back-detail-article-button"
        type="button"
        onClick={() => handleBack()}
      >
        back
      </button>
      <button
        id="logout-button"
        type="button"
        onClick={() => handleLogout(thisUser)}
      >
        logout
      </button>
    </div>
  );
}

export default ArticleDetail;
