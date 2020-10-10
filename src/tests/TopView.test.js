import React from "react";
import { mount } from "enzyme";
import { TopView }from "../components/TopView";
import axios from "axios";

jest.mock("../components/FiltersView", () => () => <div>Mocked Filter View</div>);
jest.mock("axios");

describe("TopView test cases",() => {

    const history = {
        location: {
            search : ""
        }
    };

    const TopViewWrapper = mount(<TopView history={history}/>);
    axios.get.mockImplementationOnce(() => Promise.resolve([]));

    it("should render the snapshot for Top view", () => {
        expect(TopViewWrapper).toMatchSnapshot();
    });

})