import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Top100 from '../src/top100.js';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';


test('Top100 component should render as expected', () => {
    const component = shallow(<Top100 />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
})
