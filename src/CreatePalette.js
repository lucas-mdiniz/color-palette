import React, {Component} from 'react';
import SideBar from './SideBar';
import { SketchPicker } from 'react-color';
import {TextField, Button} from '@material-ui/core';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import ColorBox from './ColorBox';
import GridItem from './GridItem';

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

const CreatePaletteWrapper = styled.div`
    display: flex;
`;

const PaletteContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    align-content: flex-start;
`;

class CreatePalette extends Component{
    constructor(props){
        super(props);

        this.state = {
            colorPicker: '#000',
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
        const newPalette = {...this.state.newPalette, [this.state.colorName]: this.state.colorPicker};
        
        this.setState({newPalette, colorName: '', colorPicker:'#000'});

    }

    render(){
        return(
            <StylesProvider injectFirst>
                <CreatePaletteWrapper>
                <SideBar>
                    <StyledForm>
                        <StyledSketchPicker
                            color={ this.state.colorPicker }
                            onChangeComplete={ this.handleChangeColorPicker }
                            name="colorPicker"
                        />
                        <StyledTextField
                            name="colorName"
                            label="Color name"
                            requireds
                            onChange = {this.handleChange}
                            value={this.state.colorName}
                        />
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Add Color
                        </Button>
                    </StyledForm>
                </SideBar>
                <PaletteContainer>
                        {Object.keys(this.state.newPalette).map(color => 
                            <GridItem>
                                <ColorBox color={this.state.newPalette[color]} name={color}/>
                            </GridItem>    
                        )}
                </PaletteContainer>
                </CreatePaletteWrapper>
            </StylesProvider>
        )
    }
}

export default CreatePalette;