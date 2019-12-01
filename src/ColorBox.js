import React from 'react';
import styled from 'styled-components';
import chroma from 'chroma-js';

const ColorName = 
    styled.span.attrs(props => ({
        style: {
            color: chroma(props.color).luminance() > 0.4 ? '#000' : '#fff'
        },
    }))`
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 7px;
`;

const StyledColorBox = 
    styled.div.attrs(props => ({
        style: {
            backgroundColor: props.color
        },
    }))`
    height: 100%;
    position: relative;
`;

function ColorBox (props){
    return(
        <StyledColorBox color={props.color} onClick={props.onClick} className={props.className}>
            {props.name &&
                <ColorName color={props.color}>{props.name}</ColorName>
            }
            {props.children}
        </StyledColorBox>
    )
}

export default ColorBox;