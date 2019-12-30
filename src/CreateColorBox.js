import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import chroma from 'chroma-js';

const StyledCreateColorBox = styled.div`
    background: ${props => (props.color)};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const ColorName = styled.p`
    padding: 10px;
    margin: 0;
    color: ${props => chroma(props.color).luminance() > 0.4 ? '#000' : '#fff'};
`;

const DeleteIcon = styled(FontAwesomeIcon)`
    padding: 10px;
    cursor: pointer;
    color: ${props => chroma(props.color).luminance() > 0.4 ? '#000' : '#fff'};
`;

function CreateColorBox(props){

    
    const handleClick = () => {
        props.delete(props.index);
    }

    return(
        <StyledCreateColorBox color={props.color}>
            <ColorName color={props.color}>{props.name}</ColorName>
            <DeleteIcon 
                icon={faTrash} 
                onClick={handleClick}
                color={props.color}
            />
        </StyledCreateColorBox>
    )
}

export default CreateColorBox;