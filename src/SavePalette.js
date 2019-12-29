import React, {useState} from 'react';
import { Picker, Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import styled from 'styled-components';
import {TextField, Button, Modal} from '@material-ui/core';

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalWrapper = styled.div`
    background:#fff;
    min-width: 700px;
    max-width: 90%;
    min-height: 300px;
    max-height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    flex-wrap: wrap;
    padding: 20px;
`;

const StyledButton = styled(Button)`
    margin-top: 30px;
`;

function SavePalette (props){

    const [next, setNext] = useState(false);
    const [icon, setIcon] = useState('');


    const handleChange = e  =>  {
        props.changeField(e);
    };
    
    const handleClose = () => {
        props.onClose();
    };

    const handleCreatePalette = () => {
        props.createPalette();
        props.onClose();
        setNext(false);
    };

    const handleNext = () => {
        setNext(true);
    };

    const addEmoji = emoji => {
        props.addEmoji(emoji);
        setIcon(emoji.colons);
    };

    let modalContent;

    if(next){
        modalContent = 
            <ModalWrapper>
                <TextField
                    name="paletteName"
                    label="Palette Name"
                    onChange = {handleChange}
                    value={props.paletteName}
                />
                <StyledButton
                    variant="contained" 
                    color="primary" 
                    onClick={handleCreatePalette}
                >
                        Create Palette
                </StyledButton>
            </ModalWrapper>
        ; 
    } else {
        modalContent = 
            <ModalWrapper>
                <h2>Choose an emoji for your palette</h2>
                <Picker set='facebook' onSelect={addEmoji}/>
                <Emoji emoji={icon} size={32}/>
                <StyledButton
                    variant="contained" 
                    color="primary" 
                    onClick={handleNext}
                >
                    Next
                </StyledButton>
            </ModalWrapper>
        ;
    }

    return(

        <StyledModal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            onClose={handleClose}
        >   
            {modalContent}
        </StyledModal>
    )
}

export default SavePalette;