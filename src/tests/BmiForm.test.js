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

  it('should return on empty weight or height', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(props.change).toHaveBeenCalledTimes(0);
  });
});
