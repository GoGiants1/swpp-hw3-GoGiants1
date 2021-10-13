import { shallow } from 'enzyme';
import React from 'react';
import EditPreview from './EditPreview';

describe('<EditPreview />', () => {
  it('should render without error', () => {
    const component = shallow(<EditPreview />);
    expect(component.find('.EditPreview').length).toBe(1);
    expect(component.find('#article-title').length).toBe(1);
    expect(component.find('#article-author').length).toBe(1);
    expect(component.find('#article-content').length).toBe(1);
  });

  it('should write tab button work', () => {
    const spySetIsPreview = jest.fn();
    const component = shallow(<EditPreview setIsPreview={spySetIsPreview} />);
    component.find('#write-tab-button').simulate('click');
    expect(spySetIsPreview).toHaveBeenCalledTimes(1);
  });

  it('should back button and confirm button work properly', () => {
    const spyHandleClickBack = jest.fn();
    const spyHandlePost = jest.fn();
    const component = shallow(
      <EditPreview
        handleClickBack={spyHandleClickBack}
        handleEdit={spyHandlePost}
      />,
    );
    const backButton = component.find('#back-edit-article-button');
    const confirmButton = component.find('#confirm-edit-article-button');
    backButton.simulate('click');
    confirmButton.simulate('click');

    expect(spyHandleClickBack).toHaveBeenCalledTimes(1);
    expect(spyHandlePost).toHaveBeenCalledTimes(1);
  });

  it('should enable confirm button when title or content input is not empty', () => {
    const component = shallow(<EditPreview title="223" content="123" />);
    const buttonConfirm = component.find('#confirm-edit-article-button');
    expect(buttonConfirm.props().disabled).toEqual(false);
  });
});
