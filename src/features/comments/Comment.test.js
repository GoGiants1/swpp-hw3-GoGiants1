/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import * as redux from 'react-redux';
import getMockStore, { stubAfterLoggedInState } from '../../test-utils/mocks';
import Comment from './Comment';
import * as commentSlice from './commentsSlice';

const mockStore = getMockStore(stubAfterLoggedInState);
const getWrapper = (props) => (
  <redux.Provider store={mockStore}>
    <Comment {...props} />
  </redux.Provider>
);

describe('<Comment />', () => {
  // let comment;
  let props;
  // let spyPutComment;
  beforeEach(() => {
    props = {
      id: 1,
      content: 'aa',
      authorName: 'gg',
      commentAuthorID: 1,
      thisUserID: 1,
      thisArticleID: 1,
    };
    // spyPutComment = jest.spyOn(putComment).mockImplementation(()=> dispatch);
    //   comment = (
    //     <Provider store={mockStore}>
    //       <Comment {...props} />
    //     </Provider>
    //   );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without error when comment author read comment ', () => {
    const wrappedComponent = getWrapper({ ...props });
    const component = mount(wrappedComponent);
    const authorName = component.find('h4').at(0);
    const commentID = component.find('p').at(0);
    const commentContent = component.find('p').at(1);
    const editCommentButton = component.find('#edit-comment-button');
    const deleteCommentButton = component.find('#delete-comment-button');
    expect(authorName.text()).toEqual('gg');
    expect(commentID.text()).toEqual('1');
    expect(commentContent.text()).toEqual('aa');
    expect(editCommentButton.length).toBe(1);
    expect(deleteCommentButton.length).toBe(1);
  });

  it("should render properly when user read another user's comment", () => {
    const wrappedComponent = getWrapper({ ...props, thisUserID: 0 });
    const component = mount(wrappedComponent);
    const authorName = component.find('h4').at(0);
    const commentID = component.find('p').at(0);
    const commentContent = component.find('p').at(1);
    const editCommentButton = component.find('#edit-comment-button');
    const deleteCommentButton = component.find('#delete-comment-button');
    expect(authorName.text()).toEqual('gg');
    expect(commentID.text()).toEqual('1');
    expect(commentContent.text()).toEqual('aa');
    expect(editCommentButton.length).toBe(0);
    expect(deleteCommentButton.length).toBe(0);
  });

  it('should call "putComment" when comment is edited', () => {
    const spyUseDispatch = jest
      .spyOn(redux, 'useDispatch')
      .mockImplementation(() => jest.fn());
    const spyPrompt = jest
      .spyOn(window, 'prompt')
      .mockImplementation(() => 'test');
    const spyPutComment = jest
      .spyOn(commentSlice, 'putComment')
      .mockImplementation((comment) => (dispatch) => {});

    const wrappedComponent = getWrapper({ ...props });
    const component = mount(wrappedComponent);
    const editCommentButton = component.find('#edit-comment-button');
    editCommentButton.simulate('click');
    expect(spyPrompt).toHaveBeenCalledTimes(1);
    expect(spyUseDispatch).toHaveBeenCalledTimes(2);
    expect(spyPutComment).toHaveBeenCalledTimes(1);
  });

  it('should not call putComment when prompt input is empty', () => {
    const spyUseDispatch = jest
      .spyOn(redux, 'useDispatch')
      .mockImplementation(() => jest.fn());
    const spyPrompt = jest.spyOn(window, 'prompt').mockImplementation(() => '');
    const spyPutComment = jest
      .spyOn(commentSlice, 'putComment')
      .mockImplementation((comment) => (dispatch) => {});
    const wrappedComponent = getWrapper({ ...props });
    const component = mount(wrappedComponent);
    const editCommentButton = component.find('#edit-comment-button');
    editCommentButton.simulate('click');
    expect(spyPrompt).toHaveBeenCalledTimes(1);
    expect(spyUseDispatch).toHaveBeenCalledTimes(1);
    expect(spyPutComment).toHaveBeenCalledTimes(0);
  });

  it('should delete comment by comment author', () => {
    const spyUseDispatch = jest
      .spyOn(redux, 'useDispatch')
      .mockImplementation(() => jest.fn());
    const spyDeleteComment = jest
      .spyOn(commentSlice, 'deleteComment')
      .mockImplementation((id, thisUserID) => (dispatch) => {});
    const wrappedComponent = getWrapper({ ...props });
    const component = mount(wrappedComponent);
    const deleteCommentButton = component.find('#delete-comment-button');
    deleteCommentButton.simulate('click');
    expect(spyUseDispatch).toHaveBeenCalledTimes(1);
    expect(spyDeleteComment).toHaveBeenCalledTimes(1);
  });
});
