import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { SketchPicker } from 'react-color';
import {TextField, Button} from '@material-ui/core';

const StyledSidebar = styled.div`
    padding: 60px;
    background: #fff;
    height: 100vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    max-width: 450px;
    box-sizing: border-box;
    transition: 500ms;
    margin-left: ${props => (props.open ? '0' : `-${document.querySelector(StyledSidebar).offsetWidth - 60}px`)};
    position: relative;
    box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
`;

const CloseArrow = styled(FontAwesomeIcon)`
    color: #979797;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px 15px;
    cursor: pointer;
    display: block !important;
`;

const StyledSketchPicker = styled(SketchPicker)`
    margin: 20px 0;
`;

const StyledForm = styled.form`
    display: flex;
    flex-flow: column;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 30px;
`;


const AlertError = styled.p`
    color: #f44336;
`;

function SideBar (props){

    const handleChangeColorPicker = color => {
        props.colorPicker(color)    
    };

    const handleSidebarClose = () => {
        props.handleClose();
    };

    const handleGenerateColor = (e) => {
        e.preventDefault();

        props.generateColor();
    };

    const nameEmpty = props.name === '';
    const validateColor = props.colors.filter((color) => color.colorName === props.name || color.color === props.color).length !== 0;
    const limitQuantity =  props.colors.length >= 20;

    return(
        <StyledSidebar open={props.sideBarOpen}>
            <StyledForm>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleGenerateColor}
                >
                        Random Color
                </Button>
                <StyledSketchPicker
                    color={ props.color}
                    onChangeComplete={ handleChangeColorPicker }
                    name="colorPicker"
                />
                <StyledTextField
                    error = {nameEmpty}
                    helperText = {nameEmpty && 'The name field is required'}
                    id="standard-error"
                    name="colorName"
                    label="Color name"
                    onChange = {props.colorName}
                    value={props.name}
                />
                {validateColor &&
                    <AlertError>
                        This name or color already exists!
                    </AlertError    >
                }
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={props.submit}
                    disabled = {nameEmpty || validateColor || limitQuantity}
                >
                        Add Color
                </Button>
                {limitQuantity &&
                    <AlertError>
                        You already have 20 colors!
                    </AlertError    >
                }
            </StyledForm>
            <CloseArrow 
                icon={props.sideBarOpen ? faArrowLeft : faArrowRight} 
                open={props.sideBarOpen} 
                onClick={handleSidebarClose}
            />
        </StyledSidebar>
    )
}

export default SideBar;