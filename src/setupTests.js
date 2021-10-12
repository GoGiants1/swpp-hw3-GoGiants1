/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-17-updated';
import enableHooks from 'jest-react-hooks-shallow';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});

// pass an instance of jest to `enableHooks()`
enableHooks(jest, { dontMockByDefault: true });
