import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


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
`;

const DeleteIcon = styled(FontAwesomeIcon)`
    padding: 10px;
    cursor: pointer;
`;

class CreateColorBox extends Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        this.props.delete(this.props.name);
    }

    render(){
        return(
            <StyledCreateColorBox color={this.props.color}>
                <ColorName>{this.props.name}</ColorName>
                <DeleteIcon icon={faTrash} onClick={this.handleClick}/>
            </StyledCreateColorBox>
        )
    }
}

export default CreateColorBox;