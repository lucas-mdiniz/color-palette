import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import color from "chroma-js";
import chroma from "chroma-js";

const CopyButton = styled.button`
    color: #fff;
    background: rgba(255,255,255,.3);
    opacity: 0;
    text-transform: uppercase; 
    padding: 7px 20px;
    transition: 300ms;
    border: none;
    cursor: pointer;
`;

const Box = styled.div`
    width: 100%;
    height: 100%;
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
    height: 100%;
    transition: all 300ms;
    position: fixed;
    opacity: ${props => (props.colorCopied ? '1' : '0')};
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: ${props => (props.colorCopied ? '10' : '-1')};
    display: flex;
    flex-flow: column;
    justify-content: center;
`;

const CopiedSign = styled.p`
    font-weight: bold;
    font-size: 3rem;
    color: #fff;
    text-shadow: #000;
    text-shadow: 2px 2px 3px rgb(0,0,0);
    text-align: center;
    background: #ffffff73;
    padding: 20px;
    line-height: 3rem;
    text-transform: uppercase;
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

    colorLuminance(){
        return chroma(this.props.color).luminance(chroma(this.props.color).luminance() + this.props.luminanceLevel/800);
    }

    copyColor(){
        this.setState({copied: true}, () => {setTimeout(() =>{ this.setState({copied: false})}, 1000)});
    }

    render(){

        const color = this.props.luminanceLevel ? this.colorLuminance() : this.props.color;
        console.log(color);

        return(
            <CopyToClipboard text={color} onCopy={this.copyColor}>
                <Box color={color}>
                    <BoxOverlay colorOverlay={this.props.color} colorCopied={this.state.copied}>
                        <CopiedSign>Copied!</CopiedSign>
                    </BoxOverlay>
                    <ColorTitle>color name</ColorTitle>
                    {this.props.hasMore &&
                        <StyledLink to={{
                            pathname: `/shades/${this.props.name}`,
                            state: {
                                color: this.props.color
                            }
                        }}>More</StyledLink>
                    }

                    <CopyButton onClick={this.handleClick}>copy</CopyButton>
                </Box>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;