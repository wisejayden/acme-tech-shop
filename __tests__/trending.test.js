import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Trending from '../src/trending.js';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';


test('Trending component should render as expected', () => {
    const component = shallow(<Trending />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
})
