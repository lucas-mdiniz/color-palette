import React from 'react';
import styled from 'styled-components';

const StyledGridItem = styled.div`
    width: 20%;
    height: 25%;
`;


function GridItem(props){
    return(
        <StyledGridItem>
            {props.children}
        </StyledGridItem>
    )
}

export default GridItem;