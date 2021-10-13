/* eslint-disable no-unused-vars */
import axios from 'axios';
import store, { history } from '../../app/store';
import commentsReducer, {
  getComments_,
  postComments_,
  putComment_,
  deleteComment_,
  getCommentsByArticle,
  getComments,
  postComments,
  putComment,
  deleteComment,
} from './commentsSlice';

const s = store();
const stubInitialState = {
  comments: [],
  commentsInArticle: null,
};

const testComments = [
  {
    id: 1,
    article_id: 1,
    author_id: 1,
    content: 'ww',
  },
  {
    id: 2,
    article_id: 1,
    author_id: 3,
    content: 'aa',
  },
];

describe('commentsSlice', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // create Slice test
  it('should create commentsSlice with initial state', () => {
    expect(commentsReducer(undefined, {})).toEqual(stubInitialState);
  });

  // reducers
  it('should getComments_ action work correctly', () => {
    expect(
      commentsReducer(stubInitialState, getComments_(testComments)),
    ).toEqual({ comments: testComments, commentsInArticle: null });
  });

  it('should postComments_ action work correctly', () => {
    const testComment = { id: 3, article_id: 1, author_id: 3, content: 'A' };
    expect(
      commentsReducer(
        { comments: testComments, commentsInArticle: null },
        postComments_(testComment),
      ),
    ).toEqual({
      comments: [...testComments, testComment],
      commentsInArticle: null,
    });
  });

  it('should putComment_ action work', () => {
    const stubPrevState = { comments: testComments, commentsInArticle: null };
    expect(
      commentsReducer(
        stubPrevState,
        putComment_({
          id: 1,
          article_id: 1,
          author_id: 1,
          content: 'w',
        }),
      ),
    ).toEqual({
      comments: [
        {
          id: 1,
          article_id: 1,
          author_id: 1,
          content: 'w',
        },
        {
          id: 2,
          article_id: 1,
          author_id: 3,
          content: 'aa',
        },
      ],
      commentsInArticle: null,
    });
  });

  it('should deleteComment_ action work', () => {
    const stubPrevState = { comments: testComments, commentsInArticle: null };
    expect(commentsReducer(stubPrevState, deleteComment_(1))).toEqual({
      ...stubPrevState,
      comments: [
        {
          id: 2,
          article_id: 1,
          author_id: 3,
          content: 'aa',
        },
      ],
    });
  });

  it('should getCommentsByArticle action work', () => {
    const stubPrevState = { comments: testComments, commentsInArticle: null };
    expect(commentsReducer(stubPrevState, getCommentsByArticle(1))).toEqual({
      ...stubPrevState,
      commentsInArticle: testComments,
    });
  });

  // thunks logic test

  it('should getComments fetch entire comments data', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testComments,
          };
          resolve(res);
        }),
    );
    s.dispatch(getComments()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should getComments handle network error', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(getComments()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should postComments post new comments correctly', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (url, data) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 201,
            data: { ...data, id: 10 },
          };
          resolve(res);
        }),
    );

    s.dispatch(
      postComments({ article_id: 1, author_id: 1, content: '123' }),
    ).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should postComments handle network error', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(postComments()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should putComment call putComments_ when axios.put success', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testComments[0],
          };
          resolve(res);
        }),
    );

    s.dispatch(putComment(testComments[0])).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should putComment handle network error', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );

    s.dispatch(putComment(testComments[0])).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should deleteComment delete correct comment', (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
          };
          resolve(res);
        }),
    );

    s.dispatch(deleteComment(1, 1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should deleteComment handle network error', (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );

    s.dispatch(deleteComment(999, 999)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
