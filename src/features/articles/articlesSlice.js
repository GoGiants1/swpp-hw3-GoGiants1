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
  },
});

// action creators
export const { getArticle_, getArticles_, postArticle_ } =
  articlesSlice.actions;

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
export const selectArticles = (state) => state.articles.articles;
export const selectSelectedArticle = (state) => state.articles.selectedArticle;

export default articlesSlice.reducer;
