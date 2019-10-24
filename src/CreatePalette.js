import React, {Component} from 'react';
import SideBar from './SideBar';
import { SketchPicker } from 'react-color';
import {TextField, Button} from '@material-ui/core';
import styled from 'styled-components';

const StyledSketchPicker = styled(SketchPicker)`
    margin: 20px 0;
`;

class CreatePalette extends Component{
    constructor(props){
        super(props);

        this.state = {
            colorPicker: '#fff',
            colorName: '',
            newPalette: {}
        }

        this.handleChangeColorPicker = this.handleChangeColorPicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeColorPicker(color) {
        this.setState({ colorPicker: color.hex })
    };

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();

        console.log(this.state.colorName);
    }

    render(){
        return(
            <SideBar>
                <form>
                    <StyledSketchPicker
                        color={ this.state.colorPicker }
                        onChangeComplete={ this.handleChangeColorPicker }
                        name="colorPicker"
                    />
                    <TextField
                        name="colorName"
                        label="Color name"
                        requireds
                        onChange = {this.handleChange}
                    />
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Add Color
                    </Button>
                </form>
            </SideBar>
        )
    }
}

export default CreatePalette;