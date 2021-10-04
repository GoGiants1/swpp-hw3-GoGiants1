import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getComments,
  postComments,
  selectCommentsInArticle,
} from './commentsSlice';
import Comment from './Comment';

function Comments({ findUserNameByID, thisArticleID, thisUserID }) {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState('');
  const comments = useSelector(selectCommentsInArticle);
  useEffect(() => {
    dispatch(getComments(thisArticleID));
    console.log(comments);
  }, []);
  const handlePostComment = () => {
    if (newContent) {
      const newComment = {
        article_id: thisArticleID,
        author_id: thisUserID,
        content: newContent,
      };
      dispatch(postComments(newComment));
      setNewContent('');
    }
  };
  // const handleDeleteComment = (id) => {};
  // const handleEditComment = (id) => {};

  return (
    <>
      <textarea
        id="new-comment-content-input"
        name="commentInput"
        placeholder="Comment"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <button
        id="confirm-create-comment-button"
        type="button"
        disabled={!newContent}
        onClick={() => handlePostComment()}
      >
        post comment
      </button>
      {comments &&
        comments.map((comment) => {
          const {
            id,
            article_id: articleID,
            author_id: authorID,
            content,
          } = comment;
          return (
            <Comment
              key={`${articleID}_${id}`}
              commentAuthorID={authorID}
              thisUserID={thisUserID}
              id={id}
              authorName={findUserNameByID(authorID)}
              content={content}
              thisArticleID={thisArticleID}
            />
          );
        })}
    </>
  );
}

export default Comments;
