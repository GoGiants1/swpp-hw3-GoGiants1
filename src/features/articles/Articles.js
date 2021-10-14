import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Article from './Article';
import { getArticles, selectArticles } from './articlesSlice';
import { selectThisUser, selectUsers, putUser } from '../user/userSlice';

function Articles({ history }) {
  const dispatch = useDispatch();
  const thisUser = useSelector(selectThisUser);
  const articles = useSelector(selectArticles);
  const users = useSelector(selectUsers);
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  // eslint-disable-next-line consistent-return
  const findUserNameByID = (id) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === id) return users[i].name;
    }
    // return null
  };

  const handleCreate = () => {
    history.push('/articles/create');
  };

  const handleLogout = (user) => {
    dispatch(putUser({ ...user, logged_in: false }));
  };

  return (
    <div className="Articles">
      {articles &&
        users &&
        articles.map((a) => {
          const { id, title, content } = a;
          const name = findUserNameByID(a.author_id);
          return (
            <Article
              history={history}
              key={`article_${id}`}
              id={id}
              authorName={name}
              title={title}
              content={content}
            />
          );
        })}
      <button
        id="create-article-button"
        type="button"
        onClick={() => handleCreate()}
      >
        Create
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

export default Articles;
