import React from 'react';
import styled from 'styled-components';

const StyledGridItem = styled.div`
    width: ${props=> props.cols ? (100/props.cols) : ''}%;
    height: ${props=>  props.rows ? (100/props.rows) : ''}%;
`;


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

export default GridItem;