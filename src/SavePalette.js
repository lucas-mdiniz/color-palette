import React, {Component} from 'react';
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
    background:
    #fff;
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

class SavePalette extends Component{
    constructor(){
        super();

        this.state = {
            next: false,
            icon: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreatePalette = this.handleCreatePalette.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
    }

    handleChange(e){
        this.props.changeField(e);
    }
    
    handleClose(){
        this.props.onClose();
    }

    handleCreatePalette(){
        this.props.createPalette();
        this.props.onClose();
        this.setState({next:false});
    }

    handleNext(){
        this.setState({next:true});
    }

    addEmoji(emoji){
        this.props.addEmoji(emoji);
        this.setState({ icon: emoji.colons});
    }

    render(){
        let modalContent;

        if(this.state.next){
            modalContent = 
                <ModalWrapper>
                    <TextField
                        name="paletteName"
                        label="Palette Name"
                        onChange = {this.handleChange}
                        value={this.props.paletteName}
                    />
                    <StyledButton
                        variant="contained" 
                        color="primary" 
                        onClick={this.handleCreatePalette}
                    >
                            Create Palette
                    </StyledButton>
                </ModalWrapper>
            ; 
        } else {
            modalContent = 
                <ModalWrapper>
                    <h2>Choose an emoji for your palette</h2>
                    <Picker set='facebook' onSelect={this.addEmoji}/>
                    <Emoji emoji={this.state.icon} size={32}/>
                    <StyledButton
                        variant="contained" 
                        color="primary" 
                        onClick={this.handleNext}
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
                open={this.props.open}
                onClose={this.handleClose}
            >   
                {modalContent}
            </StyledModal>
        )
    }
}

export default SavePalette;