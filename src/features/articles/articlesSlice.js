import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: null,
    selectedArticle: null,
  },
  reducers: {
    select: (state, action) => {
      state.selectedArticle = action.payload;
    },
    getArticles_: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { select, getArticles_ } = articlesSlice.actions;

export const getArticles = () => async (dispatch) => {
  const res = await axios.get('/api/articles');
  dispatch(getArticles_(res.data));
};

export const selectArticles = (state) => state.articles.articles;

export default articlesSlice.reducer;
