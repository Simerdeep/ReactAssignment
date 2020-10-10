import React from "react";
import { mount } from "enzyme";
import SpaceXListView from "../components/SpaceXListView";

describe("SpaceXListView test cases",() => {

    const spaceXListViewWrapper = mount(<SpaceXListView spaceXListData={[]}/>);

    it("should render the snapshot for spacexlist view", () => {
        expect(spaceXListViewWrapper).toMatchSnapshot();
    });

    it("should render card view when spacexlistdata is there", () => {

        const spaceXListData = [{
            mission_name: "1234567",
            flight_number: "123a",
            mission_id: ["123"],
            launch_year: "123",
            launch_success: false,
            rocket: null,
            links:{
                mission_patch: "23456"
            }
        }];

        spaceXListViewWrapper.setProps({
            spaceXListData
        })

        expect(spaceXListViewWrapper.find(".card").length).toBe(1);
    });

})
