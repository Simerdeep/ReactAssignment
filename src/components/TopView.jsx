//@flow

import type {Node} from "React";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import FiltersView from "./FiltersView";
import SpaceXListView from "./SpaceXListView";
import "../css/TopView.css";
import { withRouter } from "react-router";
import { getInitialStateObject } from "./spaceXHelper";
import { SPACEX_API_URL } from "../AppLabels";
import Loader from "./Loader";

type Props = {
    history: Object
};

/**
 * Component to show filters view and list of the spacex aircrafts
 *
 * @param {Props} props props received by the component
 * @returns Component
 */
export const TopView = (props: Props): Node => {

    // To hold list of spacex aircrafts
    const [spaceXListData, updateSpaceXListData] = useState([]); 
    const [isLoading,updateIsLoading] = useState(false);

    /**
     * To fetch spacex data by calling spacex api with the filters selected
     *
     */
    const getSpaceXLaunchList = async () => {

        let queryParameters = getInitialStateObject(props.history);
        updateIsLoading(true);

        try{
            const spaceXData = await Axios.get(SPACEX_API_URL,{params: queryParameters });
            updateSpaceXListData(spaceXData.data);
            updateIsLoading(false);
        }
        catch(e) {
            updateIsLoading(false);
        }
        
    }

    // To call spacex api whene component is mounted
    useEffect(() => { getSpaceXLaunchList() },[])

    return (
       <>

            <div className="col-2">
                <FiltersView 
                    getSpaceXLaunchList={getSpaceXLaunchList}
                />
            </div>

            <div className="col-10">
                {
                    isLoading ? 
                    <Loader />
                    :  <SpaceXListView 
                        spaceXListData={spaceXListData}
                    />
                }
               
            </div>
        
       </>
    )

};

export default (withRouter(TopView): any);