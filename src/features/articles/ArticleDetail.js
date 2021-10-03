/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../user/userSlice';
// comment 리덕스
// 버튼 6개
// 댓글 컨펌, 댓글 수정, 댓글 삭제
// 글 수정, 글 삭제, 뒤로가기 버튼

function ArticleDetail({ history, match }) {
  const articleID = match.params.id;
  const users = useSelector(selectUsers);
  const [loading, setLoading] = useState(true);

  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const findUserNameByID = (id) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === id) return users[i].name;
    }
    return null;
  };
  const handleBack = () => {
    history.push(`/articles`);
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await axios.get(`/api/articles/${articleID}`);
        const author = findUserNameByID(res.data.author_id);
        setAuthorName(author);
        setTitle(res.data.title);
        setContent(res.data.content);
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

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{authorName}</p>
        <p>{content}</p>
      </div>
      <textarea name="commentInput" placeholder="Comment" />
      <div className="CommentButtons">
        <button type="button">post comment</button>
        <button type="button">edit comment</button>
        <button type="button">delete</button>
      </div>
      <div className="ArticleButtons">
        <button type="button">edit article</button>
        <button type="button">delete article</button>
        <button type="button" onClick={() => handleBack()}>
          back
        </button>
      </div>
    </div>
  );
}

export default ArticleDetail;
