import { shallow } from 'enzyme';
import React from 'react';
import PreviewTab from './PreviewTab';

describe('<PreviewTab />', () => {
  it('should render without error', () => {
    const component = shallow(<PreviewTab />);
    expect(component.find('.PreviewTab').length).toBe(1);
    expect(component.find('#article-title').length).toBe(1);
    expect(component.find('#article-author').length).toBe(1);
    expect(component.find('#article-content').length).toBe(1);
  });

  it('should write tab button work', () => {
    const spySetIsPreview = jest.fn();
    const component = shallow(<PreviewTab setIsPreview={spySetIsPreview} />);
    component.find('#write-tab-button').simulate('click');
    expect(spySetIsPreview).toHaveBeenCalledTimes(1);
  });

  it('should back button and confirm button work properly', () => {
    const spyHandleClickBack = jest.fn();
    const spyHandlePost = jest.fn();
    const component = shallow(
      <PreviewTab
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
    const component = shallow(<PreviewTab title="223" content="123" />);
    const buttonConfirm = component.find('#confirm-create-article-button');
    expect(buttonConfirm.props().disabled).toEqual(false);
  });
});
