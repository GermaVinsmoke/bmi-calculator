import React from 'react';
import { shallow, mount } from 'enzyme';
import BmiForm from '../BmiForm';

describe('BmiForm Component', () => {
  let wrapper;
  const prop = {
    change: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<BmiForm {...prop} />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });

  //   it('should return on empty weight or height', () => {
  //     const setState = jest.fn();
  //     const useStateSpy = jest.spyOn(React, 'useState');
  //     useStateSpy.mockImplementation(init => [init, setState]);
  //     wrapper.find('form').simulate('submit', { preventDefault() {} });
  //     expect(prop.change).toHaveBeenCalledTimes(0);
  //   });

  it('should update the weight', () => {
    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, 'useState');
    // useStateSpy.mockImplementation(init => [init, setState]);

    const weight = wrapper.find('#weight');
    weight.simulate('change', { target: { name: 'weight', value: '50' } });
    expect(wrapper.find('#weight').props().value).toEqual('50');
  });

  it('should update the height', () => {
    const height = wrapper.find('#height');
    height.simulate('change', { target: { name: 'height', value: '176' } });
    expect(wrapper.find('#height').props().value).toEqual('176');
  });

  it('should call change', () => {
    // const realUseState = React.useState;
    // const stubData = [{ weight: '50', height: '176', date: '27/10/2019' }];

    // jest
    //   .spyOn(React, 'useState')
    //   .mockImplementationOnce(() => realUseState(stubData));

    wrapper.find('button').simulate('click');
    expect(prop.change).toHaveBeenCalledTimes(1);
  });
});
