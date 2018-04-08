import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {Catalog} from '../src/catalog.js';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';


test('Catalog component should render as expected', () => {
    const component = shallow(<Catalog />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
})
