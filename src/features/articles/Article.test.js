import { shallow } from 'enzyme';
import React from 'react';
import Article from './Article';
import { history } from '../../app/store';

describe('<Article />', () => {
  beforeEach(() => {
    history.push = jest.fn();
  });
  it('should render article row', () => {
    const component = shallow(<Article history={history} />);

    expect(component.find('.article').length).toBe(1);
  });
  it('should call history.push when clicked title button', () => {
    const component = shallow(<Article history={history} />);
    component.find('button').simulate('click');
    expect(history.push).toHaveBeenCalledTimes(1);
  });
});
