import React, {Component} from 'react';
import Palette from './ColorBox';
import styled from 'styled-components';


const StyledMiniPalette = styled.div`

`;

const PaletteName = styled.span`

`;

const PaletteIcon = styled.i`

`;

class MiniPalette extends Component{
    render(){
        return(
            <StyledMiniPalette>
                <Palette/>
                <PaletteName>Russian Palette</PaletteName>
                <PaletteIcon>Ico</PaletteIcon>
            </StyledMiniPalette>
        )
    }
}

export default MiniPalette;