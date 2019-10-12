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

const BoxOverlay = styled.div`
    background: ${props => props.colorOverlay};
    width: 100%;
    height: 100%;
    transition: all 500ms;
    position: absolute;
    opacity: 1;
    transform:  ${props => (props.colorCopied ? 'scale(50)' : 'scale(1)')};
    z-index: ${props => (props.colorCopied ? '10' : '-1')};

`;

class ColorBox extends Component{
    constructor(){
        super();

        this.state = {
            copied: false
        }

        this.copyColor = this.copyColor.bind(this);
    }
    
    colorFormated(){
        if(this.props.colorFormat === 'hex'){
            return(color(this.props.color).hex());
        } else if(this.props.colorFormat === 'rgb'){
            return(`rgb(${color(this.props.color).rgb().map(color => color)})`);
        } else {
            return(`rgba(${color(this.props.color).rgba().map(color => color)})`);
        }
    }

    copyColor(){
        this.setState({copied: true}, () => {setTimeout(() =>{ this.setState({copied: false})}, 1500)});
    }

    render(){
        return(
            <CopyToClipboard text={this.colorFormated()} onCopy={this.copyColor}>
                <Box color={this.props.color}>
                    <BoxOverlay colorOverlay={this.props.color} colorCopied={this.state.copied}/>
                    <ColorTitle>color name</ColorTitle>
                    <StyledLink to={{
                            pathname: `/shades/${this.props.name}`,
                            state: {
                                color: this.props.color 
                            }
                    }}>More</StyledLink>
                    <CopyButton onClick={this.handleClick}>copy</CopyButton>
                </Box>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;