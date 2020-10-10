import React from "react";
import { mount } from "enzyme";
import FilterButtonView from "../components/FilterButtonView";
import { LAUNCH_YEAR_LABEL } from "../AppLabels";
import { YEAR_VALUES } from "../components/spaceXHelper";


describe("Filter button view test cases",() => {

    const defaultProps = {
        filterName: LAUNCH_YEAR_LABEL,
        filterData: YEAR_VALUES,
        selectedFilter: null,
        updateSelectedFilter: jest.fn()
    };
    
    const filterButtonViewWrapper = mount(<FilterButtonView {...defaultProps}/>);

    it("should render the snapshot for filter button view", () => {
        expect(filterButtonViewWrapper).toMatchSnapshot();
    });

    it("should call on click method of button when same is not slected", () => {

        filterButtonViewWrapper.find("button").first().simulate("click");
        expect(filterButtonViewWrapper.props().updateSelectedFilter).toBeCalledWith(YEAR_VALUES[0]);
       
    });

    it("should call on click method of button when same button is already slected", () => {

        filterButtonViewWrapper.setProps({
            selectedFilter: YEAR_VALUES[0]
        });

        filterButtonViewWrapper.find("button").first().simulate("click");
        expect(filterButtonViewWrapper.props().updateSelectedFilter).toBeCalledWith(null);
    });

})