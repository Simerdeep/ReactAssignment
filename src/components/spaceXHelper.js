//@flow

import { LAUNCH_YEAR_LABEL, MISSON_ID_LABEL, SUCCESSFULL_LANDING_LABEL, SUCCESSFULL_LAUNCH_LABEL } from "../AppLabels";

export const SUCCESSFULL_LAUNCH_VALUES = ["True","False"]; // Successfull launch default values
export const SUCCESSFULL_LANDING_VALUES = ["True","False"]; // Successfull landing default values

export const SEARCH_STRING_YEAR = "year"; // search string year to append in url 
export const SEARCH_STRING_LAUNCH = "launch"; // search string launch to append in url 
export const SEARCH_STRING_LANDING = "landing"; // search string landing to append in url 

const START_YEAR = 2006; // Start year for spacex year filter
const CURRENT_YEAR = new Date().getFullYear(); // Current Year

// Constant to hold the year values to show in the filter
export const YEAR_VALUES: Array<string> = Array.from({length: CURRENT_YEAR - START_YEAR}, (_, i) => (START_YEAR + i).toString());

// constant to hold the configuration to show for a spacex aircraft
export const spacexConfig = [

    {
        heading: "",
        accessor: (data: Object): any => data.mission_name + "#" + data.flight_number,
        customClass: "missionTitle",
        isNested: false
    },
    {
        heading: MISSON_ID_LABEL,
        accessor: "mission_id",
        isNested: true
    },
    {
        heading: LAUNCH_YEAR_LABEL,
        accessor: "launch_year",
        isNested: false
    },
    {
        heading: SUCCESSFULL_LAUNCH_LABEL,
        accessor: "launch_success",
        isNested: false
    },
    {
        heading: SUCCESSFULL_LANDING_LABEL,
        accessor: (data: Object): string => getLandingValue(data),
        isNested: false
    }
];

/**
 * To get the landing value of the spacex rocket
 *
 * @param {*} data data to use to fetch landing value
 * @returns landing value
 */
const getLandingValue = (data) => {

    if(data.rocket && data.rocket.first_stage && data.rocket.first_stage.cores && data.rocket.first_stage.cores.length > 0 )
        return data.rocket.first_stage.cores[0].land_success;

    return "";

}

/**
 * To append string 
 *
 * @param {*} stringValue current value of the string
 * @param {*} stringToAppendKey key to append in the string
 * @param {*} stringToAppendValue value of the string
 * @returns modified string
 */
const appendString = (stringValue,stringToAppendKey,stringToAppendValue) => {

    if(stringValue)
        return stringValue + `&${stringToAppendKey}=${stringToAppendValue}`;
    else
        return stringValue + `?${stringToAppendKey}=${stringToAppendValue}`; 

}

/**
 * To get search string based on the filters selected 
 *
 * @param {? string} year selected year
 * @param {?string} launch selected launch
 * @param {? string} landing selected landing
 * @returns {string} search string
 */
export const getSearchString = (year:? string, launch :?string,landing :? string ): string => {

    let searchString = "";

    if(year)
        searchString = appendString(searchString,SEARCH_STRING_YEAR,year);

    if(launch)
        searchString = appendString(searchString,SEARCH_STRING_LAUNCH,launch);

    if(landing)
        searchString = appendString(searchString,SEARCH_STRING_LANDING,landing);

    return searchString;

}

/**
 * To get the initial state of the filters
 *
 * @param {Object} history route history
 * @returns {{land_success: ?string, launch_success: ?string, launch_year: ?string}} return the default state values in state
 */
export const getInitialStateObject = (history: Object): {land_success: ?string, launch_success: ?string, launch_year: ?string} => {

    let initialStateObject = {
        launch_year: null,
        launch_success: null,
        land_success: null
    };

    if(history.location && history.location.search) {

        const searchValues = history.location.search.split("&");
    
        searchValues.forEach((searchValue) => {
    
            searchValue = searchValue.replace("?","");
            
            const [key,value] = searchValue.split("=");
            
            switch (key) {
                case SEARCH_STRING_YEAR:
                    initialStateObject.launch_year = value;
                    break;
        
                case SEARCH_STRING_LANDING:
                    initialStateObject.land_success = value.toString().toLowerCase();
                    break;
        
                case SEARCH_STRING_LAUNCH:
                    initialStateObject.launch_success = value.toString().toLowerCase();
                    break;
            }

            
        });
       
    
    }

    return initialStateObject;

}