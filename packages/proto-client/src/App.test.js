import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "./App";

it("snapshot test", () => {
  let wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
