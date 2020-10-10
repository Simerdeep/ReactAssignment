//@flow

import type {Element} from "React";
import React, { useEffect, useState, useRef } from "react";
import { LAUNCH_YEAR_LABEL, SUCCESSFULL_LANDING_LABEL, SUCCESSFULL_LAUNCH_LABEL,FILTERS_LABEL  } from "../AppLabels";
import FilterButtonView from "./FilterButtonView";
import { SUCCESSFULL_LANDING_VALUES, SUCCESSFULL_LAUNCH_VALUES, YEAR_VALUES, getSearchString, getInitialStateObject } from "./spaceXHelper";
import { withRouter } from "react-router";
import "../css/FiltersView.css";

type Props = {
    history: Object,
    getSpaceXLaunchList: () => void
};

/**
 * Component to show the filters and handled state of filters
 *
 * @param {Props} props
 * @returns
 */
export const FiltersView = (props: Props): Element<"div"> => {

    const { getSpaceXLaunchList, history } = props;
    const initialStateObject = getInitialStateObject(history); // To get the initial state for the state variables
    
    const [selectedYear, updateSelectedYear] = useState(initialStateObject.launch_year); // To hold selected year filter
    const [successfullLaunch, updateSuccessfullLaunch] = useState(initialStateObject.launch_success); // To hold successfull launch filter
    const [successfullLanding, updateSuccessfullLanding] = useState(initialStateObject.land_success); // To hold successfull landing filter
    const isInitialMount = useRef(true); // To create a ref to check if component is getting mounted or update

    useEffect(() => {

        // If current value is true component is getting mounted then update it to false
        if (isInitialMount.current) {
            
            isInitialMount.current = false;
            
        } 

        // If component is getting update then update the route params and fetch new data based on filters
        else {

            let pathName = "/";

            if(selectedYear || successfullLaunch || successfullLanding)
                pathName = "/search";

            history.push({
                pathname: pathName,
                search   : getSearchString(selectedYear,successfullLaunch,successfullLanding)
            });

            getSpaceXLaunchList();
        }

    },[selectedYear,successfullLaunch,successfullLanding])

    return (
        <div className = "filters-view">

            <h3 className = "filter-heading">{FILTERS_LABEL}</h3>

            <FilterButtonView
                filterName={LAUNCH_YEAR_LABEL}
                filterData={YEAR_VALUES}
                selectedFilter={selectedYear}
                updateSelectedFilter={(year) => updateSelectedYear(year)}
            />

            <FilterButtonView
                filterName={SUCCESSFULL_LAUNCH_LABEL}
                filterData={SUCCESSFULL_LAUNCH_VALUES}
                selectedFilter={successfullLaunch}
                updateSelectedFilter={(launch) => updateSuccessfullLaunch(launch)}
            />

            <FilterButtonView
                filterName={SUCCESSFULL_LANDING_LABEL}
                filterData={SUCCESSFULL_LANDING_VALUES}
                selectedFilter={successfullLanding}
                updateSelectedFilter={(landing) => updateSuccessfullLanding(landing)}
            />

        </div>
        
    )

}

export default (withRouter(FiltersView) : any);