import React, {Component} from 'react';
import { withRouter } from "react-router";
import CopyColorBox from './CopyColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import {generateColorShades} from './Helper';
import PaletteContainer from './PaletteContainer';
import {GridItem} from './GridSystem';
import {colorFormat} from './Helper';

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
        const colorName = this.props.location.state.colorName;
        const color = this.props.urlParams.match.params.color;

        return(
            <PaletteWrapper>
                <PaletteHeader colorFormat={this.handleFormat}/>
                <PaletteContainer>
                    {generateColorShades(color).map(color => 
                        <GridItem cols={5} rows={2}>
                            <CopyColorBox color={colorFormat(color, this.state.colorFormat)} colorName={colorName}/>
                        </GridItem>
                    )}
                </PaletteContainer>
            </PaletteWrapper>
        )
    }
}

export default withRouter(ColorShades);