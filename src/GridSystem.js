import React from 'react';
import styled from 'styled-components';

const StyledPaletteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    flex-grow: 1;
    align-content: flex-start;
`;


const StyledGridItem = styled.div`
    width: ${props=> props.cols ? (100/props.cols) : ''}%;
    height: ${props=> props.rows ? (100/props.rows) : ''}%;
`;

function GridContainer(props){
    return(
        <StyledPaletteContainer >
            {props.children}
        </StyledPaletteContainer> 
    )
}


function GridItem(props){
    return(
        <StyledGridItem 
            cols={props.cols} 
            rows={props.rows} 
        >
            {props.children}
        </StyledGridItem>
    )
}

export {GridContainer, GridItem};