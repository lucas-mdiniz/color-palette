import React, {Component} from 'react';
import SideBar from './SideBar';
import { SketchPicker } from 'react-color';
import {TextField, Button} from '@material-ui/core';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import CreateColorBox from './CreateColorBox';
import { DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

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
    height: ${props=>  props.rows ? (100/props.rows) : ''}%;
`;

const PaletteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    flex-grow: 1;
    align-content: flex-start;
`;

class CreatePalette extends Component{
    constructor(props){ 
        super(props);

        this.state = {
            colorPicker: '#000',
            colorName: '',
            newPalette: {
            }
        }

        this.handleChangeColorPicker = this.handleChangeColorPicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(name){

        const newPalette = {...this.state.newPalette};

        delete newPalette[name];

        this.setState({newPalette});
    }

    onDragEnd() { 

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
                                required
                            />
                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                Add Color
                            </Button>
                        </StyledForm>
                    </SideBar>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {provided =>(
                                <PaletteContainer
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {Object.keys(this.state.newPalette).map((color, index) =>
                                        <Draggable
                                            draggableId={color}
                                            index={index}
                                        >
                                            {provided => (
                                                <GridItem 
                                                    cols={5} 
                                                    rows={4}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <CreateColorBox color={this.state.newPalette[color]} name={color} delete={this.handleDelete}/>
                                                </GridItem> 

                                            )}
                                        </Draggable>
                                    )}
                                </PaletteContainer>
                            )}

                        </Droppable>
                    </DragDropContext>
                </CreatePaletteWrapper>
            </StylesProvider>
        )
    }
}

export default CreatePalette;