import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Item from '../components/Item';

import data from '../../utils/data.json';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Item />', () => {
  const wrapper = shallow(<Item product={data[0]} />);
  it('renders without crashing', () => {});
  it('renders an image', () => {
    const image = wrapper.find('img');
    expect(image).toHaveLength(1);
  });
});
