import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import { Slider, MenuItem, Select, FormControl, InputLabel, withStyles, Typography, Button } from '@material-ui/core';
import { withRouter } from "react-router";
import {ColorFormatContext} from './context/ColorFormatContext';

const StyledPaletteHeader = styled.div`
    background: #fff;
    padding: 10px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledSelect = styled(Select)`
    min-width: 200px;
    margin-bottom: 16px;
`;

const SliderWrapper = styled.div`
    display: flex;
`;

const StyledTypography = styled(Typography)`
    margin-right: 10px !important;
`;

const StyledSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
      width: 250
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      display: 'none',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  
function PaletteHeader({changeLuminanceSlider, ...props}){

    const [colorFormat, handleColorFormat] = useContext(ColorFormatContext);

    const [luminanceSlider, setLuminance] = useState(400);

    const handleSlider = (e, value) => {
        setLuminance(value);
    };

    useEffect(() => {
        if(changeLuminanceSlider)
        changeLuminanceSlider(luminanceSlider);
    }, [luminanceSlider, changeLuminanceSlider]);
    
    const handleBack = () =>{  
        props.history.goBack();
    }

    return(
        <StyledPaletteHeader>
            { props.luminanceOn &&
                <SliderWrapper>
                    <StyledTypography gutterBottom>Level: [{luminanceSlider}]</StyledTypography>
                    <StyledSlider
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={100}
                        min={50}
                        max={900}
                        value={luminanceSlider}
                        onChange={handleSlider}
                        name='luminanceSlider'
                    />
                </SliderWrapper>
            }
            <FormControl>
                <InputLabel htmlFor="color-format">Copy Format: Hex</InputLabel>
                <StyledSelect
                value={colorFormat}
                onChange={handleColorFormat}
                inputProps={{
                    name: 'colorFormat',
                    id: 'color-format',
                }}
                >
                    <MenuItem value={'hex'}>Copy Format: HEX</MenuItem>
                    <MenuItem value={'rgb'}>Copy Format: RGB</MenuItem>
                    <MenuItem value={'rgba'}>Copy Format: RGBA</MenuItem>
                </StyledSelect>
            </FormControl>
            { props.backButton &&
                <Button variant="contained" onClick={handleBack}>Back</Button>
            }
        </StyledPaletteHeader>
    );
}


export default withRouter(PaletteHeader);