import React from "react";
import { mount, shallow } from "enzyme";
import Bar from "./Bar";
import { Line } from "react-chartjs-2";

jest.mock("react-chartjs-2", () => ({
  Line: () => null
}));

describe("Bar component", () => {
  let wrapper;
  const prop = {
    labelData: ["27/10/2019"],
    bmiData: ["16.14"]
  };

  beforeEach(() => {
    wrapper = shallow(<Bar {...prop} />);
  });

  it("renders", () => {
    expect(wrapper).not.toBeNull();

    console.log(wrapper.debug());
  });

  it("renders Line component without crashing", () => {
    shallow(<Line/>);
  });
});
