import React from 'react';
import styled from 'styled-components';




const StyledGridItem = styled.div`
    width: ${props=> props.cols ? (100/props.cols) : ''}%;
    ${props=> props.rows && `height: ${(100/props.rows)}%;`}
`;

const StyledInnerGridItem = styled.div`
    height: 100%;
`;

const StyledPaletteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    align-content: flex-start;
    ${props => props.height && `height: ${props.height}px;`}
    ${props => props.gap && `margin: -${props.gap}px;`}

    & > ${StyledGridItem} > ${StyledInnerGridItem} {
        ${props => props.gap && `padding: ${props.gap}px;`}
	}
`;

function GridContainer(props){
    return(
        <StyledPaletteContainer
            height={props.height}
            gap={props.gap}
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
            gap={props.gap}
        >
            <StyledInnerGridItem>
                {props.children}
            </StyledInnerGridItem>
        </StyledGridItem>
    )
}

export {GridContainer, GridItem};