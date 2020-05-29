import React from 'react';
import styled, {css} from "styled-components";
import {SelectableTile} from "../Shared/Tile"

import {AppContext} from "../App/AppProvider"


export const CoinGridStyled = styled.div`

display: Grid;
grid-template-columns: repeat(5,1fr);
grid-gap:15px;


`;


export default function (){
    return <AppContext.Consumer>
    {({coinList})=>
        <CoinGridStyled>

        {Object.keys(coinList).map(coinKey =>(
            <SelectableTile>{coinKey}</SelectableTile>
        ))}

        </CoinGridStyled>
    }
    </AppContext.Consumer>
}