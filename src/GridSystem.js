import React from 'react';
import styled from 'styled-components';

const StyledPaletteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    align-content: flex-start;
    ${props=> props.height && `height: ${props.height}`}px;
`;


const StyledGridItem = styled.div`
    width: ${props=> props.cols ? (100/props.cols) : ''}%;
    ${props=> props.rows && `height: ${(100/props.rows)}`}%;

`;

function GridContainer(props){
    return(
        <StyledPaletteContainer  
            height={props.height} 
        >
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