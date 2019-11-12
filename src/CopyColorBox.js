import React, {Component} from 'react';
import ColorBox from './ColorBox';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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


const CopyButton = styled.button`
    color: #fff;
    background: rgba(255,255,255,.3);
    opacity: 0;
    text-transform: uppercase; 
    padding: 7px 20px;
    transition: 300ms;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;


const StyledColorBox = styled(ColorBox)`
    cursor: pointer;
    
    &:hover {
        cursor: pointer;
        
        ${CopyButton}{
            opacity: 1;
            transition: 300ms;
        }
    }
`;


class CopyColorBox extends Component{
    constructor(){
        super();

        this.state = {
            copied: false
        }

        this.copyColor = this.copyColor.bind(this);
    }

    copyColor(){
        this.setState({copied: true}, () => {setTimeout(() =>{ this.setState({copied: false})}, 1000)});
    }

    render(){
        return(
            <CopyToClipboard text={this.props.color} onCopy={this.copyColor}>
                <StyledColorBox
                    color={this.props.color}
                    name={this.props.name}
                    className={this.props.className}
                >
                    <BoxOverlay
                        colorOverlay={this.props.color}
                        colorCopied={this.state.copied}
                    >
                        <CopiedSign>Copied!</CopiedSign>
                    </BoxOverlay>
                    <CopyButton>Copy</CopyButton>
                    {this.props.children}
                </StyledColorBox>
            </CopyToClipboard>
        )
    }
}

export default CopyColorBox;