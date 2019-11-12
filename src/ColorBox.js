import React from 'react';
import styled from 'styled-components';

const ColorName = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 7px;
`;

const StyledColorBox = styled.div`
    background-color: ${props => props.color};
    height: 100%;
    position: relative;
`;

function ColorBox (props){
    return(
        <StyledColorBox color={props.color} onClick={props.onClick} className={props.className}>
            {props.name &&
                <ColorName>{props.name}</ColorName>
            }
            {props.children}
        </StyledColorBox>
    )
}

export default ColorBox;