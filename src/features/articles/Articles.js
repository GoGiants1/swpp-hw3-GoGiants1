import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Article from './Article';
import { getArticles, selectArticles } from './articlesSlice';
import { selectIsLoggedIn, selectUsers } from '../user/userSlice';
// 아티클 객체:
function Articles() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const articles = useSelector(selectArticles);
  const users = useSelector(selectUsers);
  useEffect(() => {
    if (isLoggedIn) dispatch(getArticles());
  }, []);

  const findUserNameByID = (id) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === id) return users[i].name;
    }
    return null;
  };
  return (
    <div>
      {articles &&
        users &&
        articles.map((a) => {
          const { id, title, content } = a;
          const name = findUserNameByID(a.author_id);
          return (
            <Article
              key={`article_${id}`}
              id={id}
              authorName={name}
              title={title}
              content={content}
            />
          );
        })}
      <button id="create-article-button" type="button">
        Create
      </button>
    </div>
  );
}

export default Articles;
