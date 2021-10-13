/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { mount } from 'enzyme';
import * as redux from 'react-redux';
import getMockStore, { stubArticleDetailState } from '../../test-utils/mocks';
import Comments from './Comments';
import * as commentSlice from './commentsSlice';

jest.mock('./Comment', () => () => <div className="Comment">c</div>);

const mockStore = getMockStore(stubArticleDetailState);
const getWrapper = (props) => (
  <redux.Provider store={mockStore}>
    <Comments {...props} />
  </redux.Provider>
);

describe('<Comments />', () => {
  const spyFindUserNameByID = jest.fn(() => 'aa');
  const props = {
    findUserNameByID: spyFindUserNameByID,
    thisUserID: 1,
    thisArticleID: 1,
  };

  // const setState = jest.fn();
  // const useStateMock = (initState) => [initState, setState];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all comments', () => {
    const wrappedComponent = getWrapper(props);
    const component = mount(wrappedComponent);
    expect(component.find('#new-comment-content-input').length).toBe(1);
    expect(component.find('#confirm-create-comment-button').length).toBe(1);
  });

  it('should handle change textarea input', () => {
    const wrappedComponent = getWrapper(props);
    const component = mount(wrappedComponent);
    const commentInput = component.find('#new-comment-content-input');
    const mockedEvent = {
      preventDefault() {},
      target: { value: 'NEW_COMMENT' },
    };
    commentInput.simulate('change', mockedEvent);
  });

  it('should call "postComments" when clicking post comment button ', () => {
    const spyPostComment = jest
      .spyOn(commentSlice, 'postComments')
      .mockImplementation((comment) => (dispatch) => {});
    const wrappedComponent = getWrapper(props);
    const component = mount(wrappedComponent);
    const commentInput = component.find('#new-comment-content-input');
    const postButton = component.find('#confirm-create-comment-button');
    commentInput.simulate('change', { target: { value: 'NEW_COMMENT' } });
    postButton.simulate('click');

    expect(spyPostComment).toHaveBeenCalledTimes(1);
  });
});
