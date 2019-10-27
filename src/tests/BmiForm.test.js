import React from 'react';
import { shallow } from 'enzyme';
import BmiForm from '../BmiForm';

describe('BmiForm Component', () => {
  let wrapper;
  const props = {
    change: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<BmiForm {...props} />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });
});
