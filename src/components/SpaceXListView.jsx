//@flow

import type {Element} from "React";
import React from "react";
import { spacexConfig } from "./spaceXHelper";
import "../css/SpaceXListView.css";
import { NO_DATA_AVAILABLE } from "../AppLabels"

type Props = {
    spaceXListData: Array<Object>
};

/**
 * Component to show the spacex list
 *
 * @param {Props} {
 *     spaceXListData
 * }
 * @returns {Element<"div">}
 */
const SpaceXListView = ({
    spaceXListData
}: Props): Element<"div"> => {


    /**
     * To render the nested view if required ( Required in case of mission ids)
     *
     * @param {*} data data to show in nested view
     * @param {*} config config to check for nested flag
     * @returns Element
     */  
    const getNestedView = (data,config) => {

        if(config.isNested){

            return (
                <ul>
                {
                    data[config.accessor].map((value,index) => <li key={index}>{value}</li>)
                }
                </ul>
            );

        }

        return null;

    }

    /**
     * To get the field value to show in the dom
     *
     * @param {*} data data to extract field from
     * @param {*} config config to extract acccessor from 
     * @returns value to be shown in dom
     */
    const getFieldValue = (data, config) => {

        const { accessor, isNested } = config;

        let value = "";

        if(typeof(accessor) === "function")
            value = accessor(data);
        else
            value = data[accessor];

        if(typeof(value) === "boolean")
            value = value.toString();

        if(!value || isNested)
            value = "";
        
        return value;

    }

    return (
        <div className="spaceXView">

            {

                spaceXListData.length > 0 ?
                <>
                {
                    spaceXListData.map((data,key) => {
                        
                        return (
                            <div className="card col-3" key={key}>

                                <div className="spaceXimagebox">
                                    <img src={data.links.mission_patch} alt="SpaceX" className="spaceXimage"/>
                                </div>
                                {
                                    spacexConfig.map((config,key) => {
                                        
                                        return(
                                            <div key={key}>
                                                {
                                                    config.heading ?
                                                    <p>
                                                        <span className="font-weight-bold">{config.heading}</span> :  
                                                        <span className="spacexValue">
                                                            { getFieldValue(data,config)}
                                                        </span>
                                                        
                                                    </p>
                                                    : <p className={config.customClass}>{getFieldValue(data,config)}</p>
                                                }
                                              
                                                { getNestedView(data,config) }
                                            </div>
                                            
                                        )
                                    })
                                }
        
                            </div>
        
                        )
                       
                    })
                }
                </>
                : <h1>{NO_DATA_AVAILABLE}</h1>
            }
        
        </div>
    );

}

export default SpaceXListView;