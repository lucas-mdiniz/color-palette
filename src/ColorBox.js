import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

 

const CopyButton = styled.span`
    color: #fff;
    background: rgba(255,255,255,.3);
    opacity: 0;
    text-transform: uppercase; 
    padding: 7px 20px;
    transition: 300ms;
`;

const Box = styled.div`
    width: 100%;
    height: 20vh;
    background: ${props => props.color};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
        
    &:hover ${CopyButton}{
        opacity: 1;
        transition: 300ms;
    }
`;
const ColorTitle = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 7px;
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    background: rgba(255,255,255,.3);
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 7px 14px;
    color: #fff;
`;

class ColorBox extends Component{
    
    render(){
        return(
            <Box color={this.props.color}>
                <ColorTitle>color name</ColorTitle>
                <StyledLink to='/path'>More</StyledLink>
                <CopyButton>copy</CopyButton>
            </Box>
        )
    }
}

export default ColorBox;