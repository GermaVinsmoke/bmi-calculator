import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import Bar from '../Bar/Bar';

describe('App Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });

  it("renders Bar component correctly without crashing", () => {
    const prop = {
      date: ["20/8/2021"],
      bmi: ["19.15"]
    };
    shallow(<Bar {...prop}/>);

  });
});
