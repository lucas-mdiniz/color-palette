import React, {Component} from 'react';
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

class CreateColorBox extends Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        this.props.delete(this.props.index);
    }

    render(){
        return(
            <StyledCreateColorBox color={this.props.color}>
                <ColorName color={this.props.color}>{this.props.name}</ColorName>
                <DeleteIcon 
                    icon={faTrash} 
                    onClick={this.handleClick}
                    color={this.props.color}
                />
            </StyledCreateColorBox>
        )
    }
}

export default CreateColorBox;