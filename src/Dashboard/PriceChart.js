import React from "react";

import HighchartsConfig from "./HighchartsConfig"


import {Tile} from "../Shared/Tile"

import HighChartsTheme from "./HighChartsTheme"
import ChartSelect from "./ChartSelect"





import {AppContext} from "../App/AppProvider"

import ReactHighcharts from 'react-highcharts'


ReactHighcharts.Highcharts.setOptions(HighChartsTheme)
export default function (){
    return (
        <AppContext.Consumer>
        {({historical,changeChartSelects})=>
            <Tile>
            <ChartSelect defaultValue="months" onChange = {e=>changeChartSelects(e.target.value)}>

                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
            </ChartSelect>
                {historical?<ReactHighcharts config={HighchartsConfig(historical )}/>:<div>Loading Historical Data</div>}
            </Tile>
        }
        </AppContext.Consumer>
    )
}