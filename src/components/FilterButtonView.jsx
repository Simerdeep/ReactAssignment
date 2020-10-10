//@flow

import type {Element} from "React";
import React from "react";

type Props = {

    filterName: string,
    filterData: Array<string>,
    selectedFilter:? string,
    updateSelectedFilter: (filterValue:? string ) => void

};


/**
 * Component to show the buttons in the filter with the heading
 *
 * @param {Props} {
 *     filterName,
 *     filterData,
 *     selectedFilter,
 *     updateSelectedFilter
 * }
 * @returns {Element<"div">}
 */
const FilterButtonView = ({
    filterName,
    filterData,
    selectedFilter,
    updateSelectedFilter
}: Props ): Element<"div">  => {

    /**
     * To perform action when filter is clicked
     *
     * @param {*} filterValue selected filter value
     */
    const onFilterClick = (filterValue) => {

        if(selectedFilter === filterValue)
            updateSelectedFilter(null);
        else
            updateSelectedFilter(filterValue);
    };

    return (
        <div className="filter-button">

            <p className="align-center">{filterName}</p>
            <hr className="hr-width-20"/>

            <>

            {
                filterData.map((filterValue,index) => { 
                    
                    return(
                        <button 
                            className = {`button ${selectedFilter ? (filterValue.toString().toLowerCase() === selectedFilter.toString().toLowerCase() ? "active" : "") : ""}`} 
                            key = {index}
                            onClick = {() => onFilterClick(filterValue)}
                        >
                         {filterValue}
                        </button>
                    )
                    
                })
            }
            </>
        </div>

    );
}

export default FilterButtonView;
