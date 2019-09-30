import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import color from "chroma-js";

const CopyButton = styled.button`
    color: #fff;
    background: rgba(255,255,255,.3);
    opacity: 0;
    text-transform: uppercase; 
    padding: 7px 20px;
    transition: 300ms;
    cursor: pointer;
    border: none;
`;

const Box = styled.div`
    width: 100%;
    height: 20vh;
    background: ${props => props.color};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
        
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
    constructor(){
        super()
        this.state = {
            colorText: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        if(this.props.colorFormat === 'hex'){
            this.setState({colorText: color(this.props.color).hex()});
        } else if(this.props.colorFormat === 'rgb'){
            this.setState({colorText: color(this.props.color).rgb()});
        } else {
            this.setState({colorText: color(this.props.color).rgba()});
        }
    }

    render(){
        return(
            <Box color={this.props.color}>
                <ColorTitle>color name</ColorTitle>
                <StyledLink to='/path'>More</StyledLink>

                <CopyToClipboard text={this.props.color}>
                    <CopyButton onClick={this.handleClick}>copy</CopyButton>
                </CopyToClipboard>
            </Box>
        )
    }
}

export default ColorBox;