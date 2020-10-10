import React from "react";
import { mount } from "enzyme";
import Loader from "../components/Loader"

describe("Loader test cases",() => {

    const loaderViewWrapper = mount(<Loader/>);

    it("should render the snapshot for loader view", () => {
        expect(loaderViewWrapper).toMatchSnapshot();
    });

})
