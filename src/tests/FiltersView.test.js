import React from "react";
import { mount } from "enzyme";
import { FiltersView } from "../components/FiltersView";
import { SEARCH_STRING_LANDING, SEARCH_STRING_LAUNCH, SEARCH_STRING_YEAR, SUCCESSFULL_LANDING_VALUES, SUCCESSFULL_LAUNCH_VALUES, YEAR_VALUES } from "../components/spaceXHelper";
import { act } from "react-dom/test-utils";

describe("Filter view test cases",() => {

    const history = {
        location: {
            search : ""
        },
        push: jest.fn()
    }

    const filterViewWrapper = mount(<FiltersView history={history} getSpaceXLaunchList= {jest.fn()}/>);

    it("should render the snapshot for filter view", () => {
        expect(filterViewWrapper).toMatchSnapshot();
    });

    it("should render 3 filter button view", () => {
        
        const filterButtonLength  = filterViewWrapper.find("FilterButtonView").length;
        expect(filterButtonLength).toBe(3);

    });

    it("should update year value in state when updateSelectedFilter is called ", () => {
        
        act(() => {
            filterViewWrapper.find("FilterButtonView").first().props().updateSelectedFilter(YEAR_VALUES[3])
        });
        
        const expectedLocationObject = {
            pathname: "/search",
            search:  `?year=${YEAR_VALUES[3]}`
        }
        expect(filterViewWrapper.props().getSpaceXLaunchList).toBeCalled();
        expect(filterViewWrapper.props().history.push).toBeCalledWith(expectedLocationObject);

    });

    it("should update launch value in state when updateSelectedFilter is called ", () => {
        
        act(() => {
            filterViewWrapper.find("FilterButtonView").at(1).props().updateSelectedFilter(SUCCESSFULL_LAUNCH_VALUES[0])
        });
        
        const expectedLocationObject = {
            pathname: "/search",
            search:  `?${SEARCH_STRING_YEAR}=${YEAR_VALUES[3]}&${SEARCH_STRING_LAUNCH}=${SUCCESSFULL_LAUNCH_VALUES[0]}`
        }
        expect(filterViewWrapper.props().getSpaceXLaunchList).toBeCalled();
        expect(filterViewWrapper.props().history.push).toBeCalledWith(expectedLocationObject);

    });

    it("should update landing value in state when updateSelectedFilter is called ", () => {
        
        act(() => {
            filterViewWrapper.find("FilterButtonView").at(2).props().updateSelectedFilter(SUCCESSFULL_LAUNCH_VALUES[1])
        });
        
        const expectedLocationObject = {
            pathname: "/search",
            search:  `?${SEARCH_STRING_YEAR}=${YEAR_VALUES[3]}&${SEARCH_STRING_LAUNCH}=${SUCCESSFULL_LAUNCH_VALUES[0]}&${SEARCH_STRING_LANDING}=${SUCCESSFULL_LANDING_VALUES[1]}`
        }
        expect(filterViewWrapper.props().getSpaceXLaunchList).toBeCalled();
        expect(filterViewWrapper.props().history.push).toBeCalledWith(expectedLocationObject);

    });


})
