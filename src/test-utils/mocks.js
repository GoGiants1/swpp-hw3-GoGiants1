import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { history } from '../app/store';

export const defaultThisUser = {
  id: null,
  email: '',
  password: '',
  name: '',
  logged_in: false,
};

export const stubInitialState = {
  user: {
    thisUser: defaultThisUser,
    users: [],
    tmpUser: null,
  },
  articles: { articles: [], selectedArticle: null },
  comments: { comments: [], commentsInArticle: null },
};

export const stubAfterLoggedInState = {
  user: {
    thisUser: {
      id: 1,
      email: 'swpp@snu.ac.kr',
      password: 'iluvswpp',
      name: 'Software Lover',
      logged_in: true,
    },
    users: [
      {
        id: 1,
        email: 'swpp@snu.ac.kr',
        password: 'iluvswpp',
        name: 'Software Lover',
        logged_in: true,
      },
      {
        id: 2,
        email: 'alan@turing.com',
        password: 'iluvswpp',
        name: 'Alan Turing',
        logged_in: false,
      },
      {
        id: 3,
        email: 'edsger@dijkstra.com',
        password: 'iluvswpp',
        name: 'Edsger Dijkstra',
        logged_in: false,
      },
    ],
    tmpUser: null,
  },

  articles: {
    articles: [
      {
        id: 0,
        author_id: 1,
        title: '10 React JS Articles Every Web Developer Should Read',
        content:
          'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
      },
      {
        id: 11,
        author_id: 2,
        title: 'React: A JavaScript library for building user interfaces',
        content:
          'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
      },
      {
        id: 12,
        author_id: 1,
        title: 'Building the New facebook.com with React, GraphQL and Relay',
        content:
          "Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook.",
      },
      {
        id: 13,
        author_id: 1,
        title: 'React State with Hooks: useReducer, useState, useContext',
        content:
          "If you haven't used state management excessively in React Function Components, this tutorial may help you to get a better understanding of how React Hooks -- such as useState, useReducer, and useContext -- can be used in combination for impressive state management in React applications. In this tutorial, we will almost reach the point where these hooks mimic sophisticated state management libraries like Redux for globally managed state. Let's dive into the application which we will implement together step by step.",
      },
      {
        id: 14,
        author_id: 3,
        title: 'From Redux to Hooks: A Case Study',
        content:
          'Having a single store in Redux comes with benefits, but at the same time you end up putting everything into global namespace. Most applications profit from this, you can even create nested reducers and use naming conventions for actions. But if your global state is small and you know for sure that specific slices of state will only be used by specific areas of your application, making them global makes you feel.. uneasy.',
      },
      {
        id: 15,
        author_id: 2,
        title: 'Application State Management with React',
        content:
          "One of the reasons redux was so successful was the fact that react-redux solved the prop drilling problem. The fact that you could share data across different parts of your tree by simply passing your component into some magical connect function was wonderful. Its use of reducers/action creators/etc. is great too, but I'm convinced that the ubiquity of redux is because it solved the prop drilling pain point for developers.",
      },
      {
        id: 16,
        author_id: 2,
        title: 'What I wish I knew when I started to work with React.js',
        content:
          'After its initial release on May 29, 2013, React.js has taken over the internet. It’s not a secret that myself and many other developers owe their success to this amazing framework.',
      },
    ],
    selectedArticle: null,
  },

  comments: { comments: null, commentsInArticle: null },
};

export const getMockReducer = jest.fn(
  (initialState) =>
    (state = initialState, action) => {
      switch (action.type) {
        default:
          break;
      }
      return state;
    },
);

export default function getMockStore(preloadedState) {
  const mockArticleReducer = getMockReducer(preloadedState.articles);
  const mockUserReducer = getMockReducer(preloadedState.user);
  const mockCommentsReducer = getMockReducer(preloadedState.comments);
  const mockRootReducer = combineReducers({
    router: connectRouter(history),
    user: mockUserReducer,
    articles: mockArticleReducer,
    comments: mockCommentsReducer,
  });

  const mockStore = configureStore({
    reducer: mockRootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(routerMiddleware(history)),
    preloadedState,
  });

  return mockStore;
}
