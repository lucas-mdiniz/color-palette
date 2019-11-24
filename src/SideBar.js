import React, {Component} from 'react';
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

class SideBar extends Component{
    constructor(){
        super();

        this.handleChangeColorPicker = this.handleChangeColorPicker.bind(this);
        this.handleSidebarClose = this.handleSidebarClose.bind(this);
    }

    handleChangeColorPicker(color) {
        this.props.colorPicker(color)    
    }

    handleSidebarClose(){
        this.props.handleClose();
    }

    render(){
        const nameEmpty = this.props.name === '';
        const validateColor = this.props.colors.filter((color) => color.colorName === this.props.name || color.color === this.props.color).length !== 0;

        return(
            <StyledSidebar open={this.props.sideBarOpen}>
                <StyledForm>
                    <StyledSketchPicker
                        color={ this.props.color}
                        onChangeComplete={ this.handleChangeColorPicker }
                        name="colorPicker"
                    />
                    <StyledTextField
                        error = {nameEmpty}
                        helperText = {nameEmpty && 'The name field is required'}
                        id="standard-error"
                        name="colorName"
                        label="Color name"
                        onChange = {this.props.colorName}
                        value={this.props.name}
                    />
                    {validateColor &&
                        <AlertError>
                            This name or color already exists!
                        </AlertError>
                    }
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={this.props.submit}
                        disabled = {nameEmpty || validateColor}
                    >
                            Add Color
                    </Button>
                </StyledForm>
                <CloseArrow 
                    icon={this.props.sideBarOpen ? faArrowLeft : faArrowRight} 
                    open={this.props.sideBarOpen} 
                    onClick={this.handleSidebarClose}
                />
            </StyledSidebar>
        )
    }
}

export default SideBar;