/* eslint-disable no-unused-vars */
import axios from 'axios';
import store, { history } from '../../app/store';
import articlesReducer, {
  getArticle_,
  getArticles_,
  postArticle_,
  putArticle_,
  deleteArticle_,
  getArticle,
  getArticles,
  postArticle,
  putArticle,
  deleteArticle,
} from './articlesSlice';

const s = store();
const stubInitialState = {
  articles: [],
  selectedArticle: null,
};
const testArticles = [
  {
    id: 0,
    author_id: 1,
    title: 'a',
    content: 'aa',
  },
  {
    id: 11,
    author_id: 2,
    title: 'b',
    content: 'bb',
  },
];

describe('articlesSlice', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // create slice
  it('should create articlesSlice ', () => {
    expect(articlesReducer(undefined, {})).toEqual(stubInitialState);
  });

  it('should getArticles_ action work properly', () => {
    expect(articlesReducer(undefined, getArticles_(testArticles))).toEqual({
      ...stubInitialState,
      articles: testArticles,
    });
  });

  it('should getArticle_ action work properly', () => {
    expect(articlesReducer(undefined, getArticle_(testArticles[0]))).toEqual({
      ...stubInitialState,
      selectedArticle: testArticles[0],
    });
  });

  it('should postArticle_ action work properly', () => {
    expect(articlesReducer(undefined, postArticle_(testArticles[0]))).toEqual({
      ...stubInitialState,
      articles: [testArticles[0]],
    });
  });

  it('should putArticle_ action work properly', () => {
    const prevState = { ...stubInitialState, articles: testArticles };
    const putInput = {
      ...testArticles[0],
      content: 'aaa',
    };
    expect(articlesReducer(prevState, putArticle_(putInput))).toEqual({
      articles: [putInput, testArticles[1]],
      selectedArticle: putInput,
    });
  });

  it('should deleteArticle_ work properly', () => {
    const prevState = {
      articles: testArticles,
      selectedArticle: testArticles[0],
    };

    expect(articlesReducer(prevState, deleteArticle_(0))).toEqual({
      articles: [testArticles[1]],
      selectedArticle: null,
    });
  });

  // Thunks

  it('should getArticles call getArticles_ and axios.get', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testArticles,
          };
          resolve(res);
        }),
    );
    s.dispatch(getArticles()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should getArticles handle network error', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(getArticles()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should getArticle call getArticle_ and axios.get', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testArticles[0],
          };
          resolve(res);
        }),
    );
    s.dispatch(getArticle(1, 'aaa')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should getArticle handle network error', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(getArticle(1, 'aaa')).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should postArticle work properly', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (url, article) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
            data: { ...article, id: 12 },
          };
          resolve(res);
        }),
    );
    s.dispatch(postArticle({ author_id: 2, title: 'b', content: 'bb' })).then(
      () => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      },
    );
  });

  it('should postArticle handle network error', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (url, ar) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(postArticle({ author_id: 2, title: 'b', content: 'bb' })).then(
      () => {
        expect(console.error).toHaveBeenCalledTimes(1);
        done();
      },
    );
  });

  it('should putArticle work properly', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (url, article) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: article,
          };
          resolve(res);
        }),
    );

    s.dispatch(putArticle(testArticles[0])).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should putArticle handle network error', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (url, article) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(putArticle(testArticles[0])).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should deleteArticle call axios.delete deleteArticle_', (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
          };
          resolve(res);
        }),
    );
    s.dispatch(deleteArticle(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should deleteArticle call axios.delete deleteArticle_', (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(deleteArticle(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
