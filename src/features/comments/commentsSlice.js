import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    commentsInArticle: null,
  },
  reducers: {
    getComments_: (state, action) => {
      state.comments = action.payload;
    },
    postComments_: (state, action) => {
      state.comments.push(action.payload);
    },
    getComment_: (state, action) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) return action.payload;
        return comment;
      });
    },
    putComment_: (state, action) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) return action.payload;
        return comment;
      });
    },
    deleteComment_: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload,
      );
    },
    getCommentsByArticle: (state, action) => {
      state.commentsInArticle = state.comments.filter(
        (comment) => comment.article_id === action.payload,
      );
    },
  },
});

export const {
  getComments_,
  postComments_,
  getComment_,
  putComment_,
  deleteComment_,
  getCommentsByArticle,
} = commentsSlice.actions;

export const getComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get('/api/comments');
    dispatch(getComments_(res.data));
    dispatch(getCommentsByArticle(id));
  } catch (err) {
    console.error(err);
  }
};

export const postComments = (comment) => async (dispatch) => {
  try {
    const res = await axios.post('/api/comments', comment);
    // comments에 새로운 comment 추가하기
    dispatch(postComments_(res.data));
    // commentsInArticle 최신화
    dispatch(getCommentsByArticle(comment.article_id));
  } catch (err) {
    console.error(err);
  }
};

export const getComment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/comments${id}`);
    dispatch(getComment_(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const putComment = (comment) => async (dispatch) => {
  try {
    await axios.put(`/api/comments/${comment.id}`, comment);
    dispatch(putComment_(comment));
    dispatch(getCommentsByArticle(comment.article_id));
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = (id, articleID) => async (dispatch) => {
  try {
    await axios.delete(`/api/comments/${id}`);
    dispatch(deleteComment_(id));
    dispatch(getCommentsByArticle(articleID));
  } catch (error) {
    console.error(error);
  }
};

export const selectComments = (state) => state.comments.comments;
export const selectComment = (state, id) =>
  state.comments.comments.filter((c) => c.id === id);
export const selectCommentsInArticle = (state) =>
  state.comments.commentsInArticle;
export default commentsSlice.reducer;
