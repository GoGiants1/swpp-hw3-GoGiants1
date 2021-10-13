import { shallow } from 'enzyme';
import React from 'react';
import WriteTab from './WriteTab';

describe('<WriteTab />', () => {
  it('should render without error', () => {
    const component = shallow(<WriteTab />);

    expect(component.find('#write-tab-button').length).toBe(1);
    expect(component.find('#preview-tab-button').length).toBe(1);
    expect(component.find('#article-title-input').length).toBe(1);
    expect(component.find('#article-content-input').length).toBe(1);
    expect(component.find('#back-create-article-button').length).toBe(1);
    expect(component.find('#confirm-create-article-button').length).toBe(1);
  });

  it('should preview tab button work', () => {
    const spySetIsPreview = jest.fn();
    const component = shallow(<WriteTab setIsPreview={spySetIsPreview} />);
    component.find('#preview-tab-button').simulate('click');
    expect(spySetIsPreview).toHaveBeenCalledTimes(1);
  });

  it('should article title input change properly', () => {
    const spySetTitle = jest.fn();
    const component = shallow(<WriteTab setTitle={spySetTitle} />);
    const titleInput = component.find('#article-title-input');
    titleInput.simulate('change', { target: { value: 'TEST_INPUT' } });
    expect(spySetTitle).toHaveBeenCalledTimes(1);
  });

  it('should article content input change properly', () => {
    const spySetContent = jest.fn();
    const component = shallow(<WriteTab setContent={spySetContent} />);
    const contentInput = component.find('#article-content-input');
    contentInput.simulate('change', { target: { value: 'TEST_INPUT' } });
    expect(spySetContent).toHaveBeenCalledTimes(1);
  });

  it('should back button and confirm button work properly', () => {
    const spyHandleClickBack = jest.fn();
    const spyHandlePost = jest.fn();
    const component = shallow(
      <WriteTab
        handleClickBack={spyHandleClickBack}
        handlePost={spyHandlePost}
      />,
    );
    const backButton = component.find('#back-create-article-button');
    const confirmButton = component.find('#confirm-create-article-button');
    backButton.simulate('click');
    confirmButton.simulate('click');

    expect(spyHandleClickBack).toHaveBeenCalledTimes(1);
    expect(spyHandlePost).toHaveBeenCalledTimes(1);
  });
  it('should enable confirm button when title or content input is not empty', () => {
    const component = shallow(<WriteTab title="223" content="123" />);
    const buttonConfirm = component.find('#confirm-create-article-button');
    expect(buttonConfirm.props().disabled).toEqual(false);
  });
});
