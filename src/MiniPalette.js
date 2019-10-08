import React, {Component} from 'react';
import Palette from './ColorBox';
import styled from 'styled-components';
import { Grid, height } from '@material-ui/core';




const MiniPaletteWrapper =  styled.div`

`;

const StyledMiniPalette = styled.div`
    background: #cdcdcd;
    padding: 10px;
`;

const MiniColorBox = styled.div`
    width: 100%;
    height: 35px;
    background: ${props => props.color};
`;

const PaletteIcon = styled.i`

`;

const PaletteName = styled.span`
    display: block;
    margin-top: 10px;
`;

const PaletteDescription = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;
class MiniPalette extends Component{
    render(){
        return(
            <StyledMiniPalette>
                <MiniPaletteWrapper>
                    <Grid container>
                        {Object.values(this.props.colors).map(color =>  <Grid item xs={3}><MiniColorBox color={color}/></Grid>)}
                    </Grid>
                </MiniPaletteWrapper> 
                <PaletteDescription>
                    <PaletteName>{this.props.name}</PaletteName>
                    <PaletteIcon>{this.props.icon}</PaletteIcon>   
                </PaletteDescription>
            </StyledMiniPalette>
        )
    }
}

export default MiniPalette;