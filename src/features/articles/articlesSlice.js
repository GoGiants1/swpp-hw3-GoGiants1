import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { replace } from 'connected-react-router';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: null,
    selectedArticle: null,
  },
  reducers: {
    getArticles_: (state, action) => {
      state.articles = action.payload;
    },
    getArticle_: (state, action) => {
      state.selectedArticle = action.payload;
    },
    postArticle_: (state, action) => {
      state.articles.push(action.payload);
    },
    putArticle_: (state, action) => {
      state.articles.map((article) => {
        if (article.id === action.payload.id) {
          return action.payload;
        }
        return article;
      });
      state.selectedArticle = action.payload;
    },
    deleteArticle_: (state, action) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload,
      );
      state.selectedArticle = null;
    },
  },
});

// action creators
export const {
  getArticle_,
  getArticles_,
  postArticle_,
  putArticle_,
  deleteArticle_,
} = articlesSlice.actions;

// thunk logics
export const getArticle = (id, authorName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/articles/${id}`);
    dispatch(getArticle_({ ...res.data, authorName }));
  } catch (err) {
    console.error(err);
  }
};

export const getArticles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/articles');
    dispatch(getArticles_(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const postArticle = (ar) => async (dispatch) => {
  try {
    const res = await axios.post('/api/articles', ar);
    dispatch(postArticle_(res.data));
    dispatch(replace(`/articles/${res.data.id}`));
  } catch (err) {
    console.error(err);
  }
};
export const putArticle = (ar) => async (dispatch) => {
  try {
    await axios.put(`/api/articles/${ar.id}`, ar);
    dispatch(putArticle_(ar));
    dispatch(replace(`/articles/${ar.id}`));
  } catch (e) {
    console.error(e);
  }
};
export const deleteArticle = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/articles/${id}`);
    dispatch(deleteArticle_(id));
    dispatch(replace('/articles'));
  } catch (e) {
    console.error(e);
  }
};

export const selectArticles = (state) => state.articles.articles;
export const selectSelectedArticle = (state) => state.articles.selectedArticle;

export default articlesSlice.reducer;
