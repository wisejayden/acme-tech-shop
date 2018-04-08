import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {Home} from '../src/home.js';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';


test('Home component should render as expected', () => {
    const component = shallow(<Home />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
})
