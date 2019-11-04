import React, {Component} from 'react';
import SideBar from './SideBar';
import { SketchPicker } from 'react-color';
import {TextField, Button, Modal} from '@material-ui/core';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import CreateColorBox from './CreateColorBox';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

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

const GridItem = styled.div`
    width: ${props=> props.cols ? (100/props.cols) : ''}%;
    height: ${props=>  props.rows  ? (100/props.rows) : ''}%;
`;

const PaletteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    flex-grow: 1;
    align-content: flex-start;
`;

const AlertError = styled.p`
    color: #f44336;
`;

const PaletteHeader = styled.div`
    background: #fff;
    padding 10px;
    display: flex;
    justify-content: flex-end;
`;

const PalleteWrapper = styled.div`
    width: 100%;

`;

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;


const SortableGrid = SortableContainer(({children}) =>
    <PaletteContainer>
        {children}
    </PaletteContainer>
);

const SortableBox = SortableElement(({children}) =>
        <GridItem 
            cols={5} 
            rows={4}
        >
            {children}
        </GridItem> 
);


class CreatePalette extends Component{
    constructor(props){ 
        super(props);

        this.state = {
            colorPicker: '#000',
            colorName: '',
            colors: [],
            paletteName: '',
            setOpen: false
        }

        this.handleChangeColorPicker = this.handleChangeColorPicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
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
        const color = {
            colorName: this.state.colorName,
            color: this.state.colorPicker
        }
        const colors = [...this.state.colors, color];
        
        this.setState({colors, colorName: '', colorPicker:'#000'});
    }

    handleDelete(index){
        const colors = [...this.state.colors];

        colors.splice(index,1);

        this.setState({colors});
    }

    handleOpen(){
        this.setState({setOpen: true});
    };

    handleClose(){
        this.setState({setOpen: false});
    };

    onSortEnd({oldIndex, newIndex}) { 
        let colors = [...this.state.colors];

        colors = arrayMove(colors, oldIndex, newIndex);

        this.setState({colors});
    }


    render(){
        const nameEmpty = this.state.colorName === '';
        const validateColor = this.state.colors.filter((color) => color.colorName === this.state.colorName || color.color === this.state.colorPicker).length !== 0;

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
                                error = {nameEmpty}
                                helperText = {nameEmpty && 'The name field is required'}
                                id="standard-error"
                                name="colorName"
                                label="Color name"
                                onChange = {this.handleChange}
                                value={this.state.colorName}
                            />
                            {validateColor &&
                                <AlertError>
                                    This name or color already exists!
                                </AlertError>
                            }
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleSubmit}
                                disabled = {nameEmpty || validateColor}
                            >
                                    Add Color
                            </Button>
                        </StyledForm>
                    </SideBar>
                        <PalleteWrapper>
                            <PaletteHeader>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={this.handleOpen}
                                >
                                    Save Palette
                                </Button> 
                                <StyledModal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.setOpen}
                                    onClose={this.handleClose}
                                >   
                                    <div style={{maxWidth: '600px', background: '#fff'}}>
                                        <StyledTextField
                                            error = {nameEmpty}
                                            helperText = {nameEmpty && 'The palette name required'}
                                            name="PaletteName"
                                            label="Palette Name"
                                            onChange = {this.handleChange}
                                            value={this.state.paletteName}
                                        />                                     
                                    </div>
                                </StyledModal>
                            </PaletteHeader>
                            <SortableGrid distance={1} axis="xy" onSortEnd ={this.onSortEnd}>
                                {this.state.colors.map((color, index) =>
                                            <SortableBox index={index} key={color.color}>
                                                <CreateColorBox color={color.color} name={color.colorName} index={index} delete={this.handleDelete}/>
                                            </SortableBox> 
                                )}
                            </SortableGrid>
                        </PalleteWrapper>
                </CreatePaletteWrapper>
            </StylesProvider>
        )
    }
}

export default CreatePalette;