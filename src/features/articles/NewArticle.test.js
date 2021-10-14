/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState as useStateMock } from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import getMockStore, { stubArticleDetailState } from '../../test-utils/mocks';
import * as articlesSlice from './articlesSlice';
import * as userSlice from '../user/userSlice';
import NewArticle from './NewArticle';
import { history } from '../../app/store';

jest.mock(
  './PreviewTab',
  () =>
    ({ setIsPreview, handleClickBack, handlePost }) =>
      (
        <div className="PreviewTab">
          preview!
          <button
            id="write-tab-button"
            type="button"
            onClick={() => setIsPreview(false)}
          >
            write tab
          </button>
          <button
            id="back-create-article-button"
            type="button"
            onClick={() => handleClickBack()}
          >
            back
          </button>
          <button
            id="confirm-create-article-button"
            type="button"
            onClick={() => handlePost()}
          >
            confirm
          </button>
        </div>
      ),
);
jest.mock(
  './WriteTab',
  () =>
    ({ setIsPreview, handleClickBack, handlePost }) =>
      (
        <div className="WriteTab">
          write!
          <button
            id="preview-tab-button"
            type="button"
            onClick={() => setIsPreview(true)}
          >
            preview tab
          </button>
          <button
            id="back-create-article-button"
            type="button"
            onClick={() => handleClickBack()}
          >
            back
          </button>
          <button
            id="confirm-create-article-button"
            type="button"
            onClick={() => handlePost()}
          >
            confirm
          </button>
        </div>
      ),
);

const mockStore = getMockStore(stubArticleDetailState);
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));
describe('<NewArticle>', () => {
  let newArticle;
  let spyPostArticle;
  let spyPutUser;
  // const setState = jest.fn();

  beforeEach(() => {
    // useStateMock.mockImplementation((initState) => [initState, setState]);

    newArticle = (
      <redux.Provider store={mockStore}>
        <NewArticle history={history} />
      </redux.Provider>
    );
    spyPostArticle = jest
      .spyOn(articlesSlice, 'postArticle')
      .mockImplementation(() => (dispatch) => {});
    spyPutUser = jest
      .spyOn(userSlice, 'putUser')
      .mockImplementation(() => (dispatch) => {});
    history.push = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Write page in initial visit', () => {
    const component = mount(newArticle);
    expect(component.find('NewArticle').length).toBe(1);
  });

  it('should call putUser when #logout-button clicked', () => {
    const component = mount(newArticle);
    const logoutButton = component.find('#logout-button');
    logoutButton.simulate('click');
    expect(spyPutUser).toHaveBeenCalledTimes(1);
  });

  it('should call handleClick back when backButton clicked', () => {
    const component = mount(newArticle);
    const backButton = component.find('#back-create-article-button');
    backButton.simulate('click');
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should call handlePost when post article button clicked', () => {
    const component = mount(newArticle);
    const confirmButton = component.find('#confirm-create-article-button');
    confirmButton.simulate('click');
    expect(spyPostArticle).toHaveBeenCalledTimes(1);
  });

  it('should render when isPreview is false', () => {
    const component = mount(newArticle);
    // console.log(component.debug());
    const previewTabButton = component.find('#preview-tab-button');
    previewTabButton.simulate('click');

    // expect(setState).toHaveBeenCalledTimes(1);
  });
});
