import '@babel/polyfill';

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import axios from 'axios';

import testData from './testData';

import App from '../components/App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

jest.mock('axios');
//none of this works
describe('<App />', () => {
  it('renders without crashing', () => {});
  it('gets related products', () => {
    //this test is broken
    axios.get.mockResolvedValue(testData);
    const mountedApp = mount(<App />);
    return Promise.resolve(mountedApp)
      .then(() => {
        mountedApp.update();
      })
      .then(() => {
        console.log('$$$$$', mountedApp.state());
      });
  });
});
