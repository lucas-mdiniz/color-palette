import React, {Component} from 'react';
import { withRouter } from "react-router";
import ColorBox from './ColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import {generateColorShades} from './Helper';
import PaletteContainer from './PaletteContainer';
import GridItem from './GridItem';

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;

class ColorShades extends Component{
    constructor(){
        super();

        this.state = {
            colorFormat: 'hex'
        }

        this.handleFormat = this.handleFormat.bind(this);
    }

    handleFormat(colorFormat){
        this.setState({colorFormat});
    }


    render(){
        const color = this.props.location.state.color;
        // usar a colorName como key quando criar
        return(
            <PaletteWrapper>
                <PaletteHeader colorFormat={this.handleFormat}/>
                <PaletteContainer>
                    {generateColorShades(color).map(color => 
                        <GridItem cols={5} rows={2}>
                            <ColorBox colorFormat={this.state.colorFormat} color={color}/>
                        </GridItem>
                    )}
                </PaletteContainer>
            </PaletteWrapper>
        )
    }
}

export default withRouter(ColorShades);