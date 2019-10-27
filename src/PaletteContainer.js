import React from 'react';
import styled from 'styled-components';

const StyledPaletteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    flex-grow: 1;
    align-content: flex-start;
`;

function PaletteContainer(props){
    return(

       <StyledPaletteContainer ref={props.innerRef}>
           {props.children}
       </StyledPaletteContainer> 
    )
}

export default PaletteContainer;