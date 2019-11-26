import React, {Component} from 'react';
import SideBar from './SideBar';
import {Button} from '@material-ui/core';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import CreateColorBox from './CreateColorBox';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import SavePalette from './SavePalette';
import axios from 'axios';
import {GridContainer} from './GridSystem';
import chroma from 'chroma-js';

const CreatePaletteWrapper = styled.div`
    display: flex;
`;

const GridItem = styled.div`
    width: ${props=> props.cols ? (100/props.cols) : ''}%;
    height: ${props=>  props.rows  ? (100/props.rows) : ''}%;
`;

const PaletteHeader = styled.div`
    background: #fff;
    padding 10px;
    display: flex;
    justify-content: flex-end;
`;

const PalleteWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
`;

const ColorLimitAlert = styled.p`
    color: #f44336;
    margin-right: 30px;
`;


const SortableGrid = SortableContainer(({children}) =>
    <GridContainer>
        {children}
    </GridContainer>
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
            setOpen: false,
            icon: '',
            sideBarOpen: true
        }

        this.handleChangeColorPicker = this.handleChangeColorPicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
        this.handleCreatePalette = this.handleCreatePalette.bind(this);
        this.handleSidebarClose = this.handleSidebarClose.bind(this);
        this.generateColor = this.generateColor.bind(this);
    }

    handleChangeColorPicker(color) {
        const newColor = chroma(color.rgb).hex();
        console.log(chroma([126,60,60,0.64]).hex());
        this.setState({ colorPicker: newColor })
    };

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
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

    addEmoji(emoji){
        this.setState({icon: emoji.colons});
    }

    handleCreatePalette(){
        axios.post('http://localhost:3000/palettes',{
            colors: this.state.colors,
            name: this.state.paletteName,
            icon: this.state.icon
        }).then((response) => {
            this.props.urlParams.history.push('/');
            this.props.palettesUpdate(response);
        });
    }

    handleSidebarClose(){
        this.setState(previousState => ({sideBarOpen: !previousState.sideBarOpen}));
    }

    generateColor(){
        const color = chroma.random().hex();

        this.setState({colorPicker: color});

    }


    render(){
        return(
            <StylesProvider injectFirst>
                <CreatePaletteWrapper>
                    <SideBar 
                        colorPicker = {this.handleChangeColorPicker}
                        color={this.state.colorPicker}
                        colorName = {this.handleChange}
                        name={this.state.colorName}
                        colors={this.state.colors}
                        submit={this.handleSubmit}
                        handleClose={this.handleSidebarClose}
                        sideBarOpen={this.state.sideBarOpen}
                        generateColor={this.generateColor}
                    />
                    <PalleteWrapper>
                        <PaletteHeader>
                            {this.state.colors.length < 20 &&
                            <ColorLimitAlert>Please insert 20 colors!</ColorLimitAlert>
                            }
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleOpen}
                                disabled={this.state.colors.length !== 20}
                            >
                                Save Palette
                            </Button> 
                            <SavePalette
                                open={this.state.setOpen}
                                onClose={this.handleClose}
                                paletteName={this.state.paletteName}
                                changeField={this.handleChange}
                                createPalette={this.handleCreatePalette}
                                addEmoji = {this.addEmoji}
                             />  
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