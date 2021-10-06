import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { putComment, deleteComment } from './commentsSlice';

function Comment({
  id,
  content,
  authorName,
  commentAuthorID,
  thisUserID,
  thisArticleID,
}) {
  const dispatch = useDispatch();
  const isAuthor = commentAuthorID === thisUserID;
  const [commentContent, setCommentContent] = useState(content);
  const handleEdit = () => {
    const result = window.prompt('Edit Comment', commentContent);
    if (result && result !== content) {
      setCommentContent(result);
      dispatch(
        putComment({
          id,
          article_id: thisArticleID,
          author_id: thisUserID,
          content: result,
        }),
      );
    }
  };
  const handleDelete = () => {
    dispatch(deleteComment(id, thisArticleID));
  };

  return (
    <div>
      <div>
        <h4>{authorName}</h4>
        <p>{id}</p>
        <p>{commentContent}</p>
      </div>
      <div className="CommentButtons">
        {isAuthor ? (
          <>
            <button
              id="edit-comment-button"
              type="button"
              onClick={() => handleEdit()}
            >
              edit comment
            </button>
            <button
              id="delete-comment-button"
              type="button"
              onClick={() => handleDelete()}
            >
              delete comment
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Comment;
