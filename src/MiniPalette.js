import React, {Component} from 'react';
import styled from 'styled-components';
import ColorBox from './ColorBox';
import {GridContainer, GridItem} from './GridSystem';
import { Emoji } from 'emoji-mart';

const StyledMiniPalette = styled.div`
    background: #cdcdcd;
    padding: 10px;
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
                <GridContainer height={200}>
                        {Object.values(this.props.colors).map(color =>  
                            <GridItem cols={5} rows={4} key={color.colorName}>
                                <ColorBox color={color.color}/>
                            </GridItem>)}
                </GridContainer> 
                <PaletteDescription>
                    <PaletteName>{this.props.name}</PaletteName>
                    <PaletteIcon>
                        <Emoji emoji={this.props.icon} size={32}/>
                    </PaletteIcon>   
                </PaletteDescription>
            </StyledMiniPalette>
        )
    }
}

export default MiniPalette;