import React, {useState, useEffect} from 'react';
import ColorBox from './ColorBox';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';

const BoxOverlay =    
    styled.div.attrs(props => ({
        style: {
            background: props.colorOverlay,
            opacity: (props.colorCopied ? '1' : '0'),
            zIndex: props.colorCopied ? '10' : '-1',
        },
    }))`

    height: 100%;
    transition: all 300ms;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
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


const CopyButton =
    styled.button.attrs(props => ({
        style: {
            color: chroma(props.color).luminance() > 0.4 ? '#000' : '#fff',
            background: chroma(props.color).luminance() > 0.4 ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,.3)'
        },
    }))`

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


function CopyColorBox (props){

    const [copied, setCopied] = useState(false);

    const copyColor = () => {
        setCopied(!copied);
    };

    useEffect(() => {
        if (copied === true) {
            const id = setTimeout(() =>{
                setCopied(prev => !prev);
            }, 1000);

            return () => {
                clearTimeout(id);
            }
        }
    }, [copied]);
    
    return(
        <CopyToClipboard text={props.color} onCopy={copyColor}>
            <StyledColorBox
                color={props.color}
                name={props.name}
                className={props.className}
            >
                <BoxOverlay
                    colorOverlay={props.color}
                    colorCopied={copied}
                >
                    <CopiedSign>Copied!</CopiedSign>
                </BoxOverlay>
                <CopyButton color={props.color}>Copy</CopyButton>
                {props.children}
            </StyledColorBox>
        </CopyToClipboard>
    )
}

export default CopyColorBox;