import React from 'react';
import { shallow } from 'enzyme';
import Bar from '../Bar';

describe('Bar component', () => {
  let wrapper;
  const prop = {
    labelData: ['27/10/2019'],
    bmiData: ['16.14']
  };

  beforeEach(() => {
    wrapper = shallow(<Bar {...prop} />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });
});
