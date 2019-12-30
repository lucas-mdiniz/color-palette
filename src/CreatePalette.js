import React, {useState} from 'react';
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
import {generateColorShades} from './Helper';
import useInputState from './hooks/useInputState';

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


function CreatePalette(props){

    const [colorPicker, setColorPicker] = useState('#000');
    const [colorName, setColorName, resetColorName] = useInputState('');
    const [colors, setColors] = useState([]);
    const [paletteName, setPaletteName] = useInputState('');
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState('');
    const [sideBarOpen, setSideBarOpen] = useState(true);

    const handleChangeColorPicker = color => {
        const newColor = chroma(color.rgb).hex();
        console.log(chroma([126,60,60,0.64]).hex());
        setColorPicker(newColor);
    };

    const handleSubmit = e =>{
        e.preventDefault();
        const color = {
            colorName: colorName,
            color: colorPicker
        }
        const newColors = [...colors, color];
        
        setColors(newColors);
        resetColorName();
        setColorPicker('#000');
    }

    const handleDelete = index => {
        const newColors = [...colors];

        newColors.splice(index,1);

        setColors(newColors);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSortEnd = ({oldIndex, newIndex}) => { 
        let newColors = [...colors];

        newColors = arrayMove(newColors, oldIndex, newIndex);

        setColors(newColors);
    }

    const addEmoji = emoji => {
        setIcon(emoji.colons);
    }

    const handleCreatePalette = () => {

        colors.map(color => color['shades'] = generateColorShades(color.color));

        axios.post('http://localhost:3000/palettes',{
            colors: colors,
            name: paletteName,
            icon: icon
        }).then((response) => {
            props.urlParams.history.push('/');
            props.palettesUpdate(response);
        }).catch(error =>{
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }

    const handleSidebarClose = () => {
        setSideBarOpen(prev => !prev);
    }

    const generateColor = () => {
        const color = chroma.random().hex();

        setColorPicker(color);

    }

    return(
        <StylesProvider injectFirst>
            <CreatePaletteWrapper>
                <SideBar 
                    colorPicker = {handleChangeColorPicker}
                    color={colorPicker}
                    colorName = {setColorName}
                    name={colorName}
                    colors={colors}
                    submit={handleSubmit}
                    handleClose={handleSidebarClose}
                    sideBarOpen={sideBarOpen}
                    generateColor={generateColor}
                />
                <PalleteWrapper>
                    <PaletteHeader>
                        {colors.length < 20 &&
                        <ColorLimitAlert>Please insert 20 colors!</ColorLimitAlert>
                        }
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleOpen}
                            disabled={colors.length !== 20}
                        >
                            Save Palette
                        </Button> 
                        <SavePalette
                            open={open}
                            onClose={handleClose}
                            paletteName={paletteName}
                            changeField={setPaletteName}
                            createPalette={handleCreatePalette}
                            addEmoji = {addEmoji}
                            />  
                    </PaletteHeader>
                    <SortableGrid distance={1} axis="xy" onSortEnd ={onSortEnd}>
                        {colors.map((color, index) =>
                                    <SortableBox index={index} key={color.color}>
                                        <CreateColorBox color={color.color} name={color.colorName} index={index} delete={handleDelete}/>
                                    </SortableBox> 
                        )}
                    </SortableGrid>
                </PalleteWrapper>
            </CreatePaletteWrapper>
        </StylesProvider>
    )
}

export default CreatePalette;