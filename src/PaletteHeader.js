import React, {Component} from 'react';
import styled from 'styled-components';
import { Slider, MenuItem, Select, FormControl, InputLabel, withStyles, Typography } from '@material-ui/core';

const StyledPaletteHeader = styled.div`
    background: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
`;

const StyledSelect = styled(Select)`
    min-width: 200px;
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
class PaletteHeader extends Component{
    constructor(){
        super();

        this.state = {
            colorFormat: '',
            luminanceSlider: 400
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
    }
    
    handleChange(e, value){
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.props.colorFormat(this.state.colorFormat));
    }

    handleSlider(e, value){
        this.setState({
            luminanceSlider: value
        }, () => this.props.luminanceSlider(this.state.luminanceSlider));
    }
    
    render(){
        return(
            <StyledPaletteHeader>
                { this.props.luminanceOn &&
                    <SliderWrapper>
                        <StyledTypography gutterBottom>Level: [{this.state.luminanceSlider}]</StyledTypography>
                        <StyledSlider
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={100}
                            min={50}
                            max={700}
                            value={this.state.luminanceSlider}
                            onChange={this.handleSlider}
                            name='luminanceSlider'
                        />
                    </SliderWrapper>
                }
                <FormControl>
                    <InputLabel htmlFor="color-format">Copy Format: Hex</InputLabel>
                    <StyledSelect
                    value={this.state.colorFormat}
                    onChange={this.handleChange}
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
            </StyledPaletteHeader>
        );
    }
}

export default PaletteHeader;