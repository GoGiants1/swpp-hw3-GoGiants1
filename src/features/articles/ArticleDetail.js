/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, selectThisUser } from '../user/userSlice';
import Comments from '../comments/Comments';
import { deleteArticle } from './articlesSlice';
// comment 리덕스
// 버튼 6개
// 댓글 컨펌, 댓글 수정, 댓글 삭제
// 글 수정, 글 삭제, 뒤로가기 버튼

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

  const findUserNameByID = (id) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === id) return users[i].name;
    }
    return null;
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

  const handleArticleEdit = () => {
    history.push(`/articles/${articleID}/edit`);
  };

  const handleArticleDelete = () => {
    dispatch(deleteArticle(articleID));
  };

  return (
    <div>
      <div>
        <h2 id="article-title">{title}</h2>
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
    </div>
  );
}

export default ArticleDetail;
