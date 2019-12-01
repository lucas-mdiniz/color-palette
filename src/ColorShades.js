import React, {Component} from 'react';
import { withRouter } from "react-router";
import CopyColorBox from './CopyColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
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
        const colors = this.props.location.state.color;
        const colorName = this.props.urlParams.match.params.color;
        return(
            <PaletteWrapper>
                <PaletteHeader colorFormat={this.handleFormat} backButton/>
                <PaletteContainer>
                    {Object.keys(colors).map(color => 
                        <GridItem key={`${colorName} ${color}`} cols={5} rows={2}>
                            <CopyColorBox color={colorFormat(colors[color], this.state.colorFormat)} name={`${colorName} ${color}`}/>
                        </GridItem>
                    )}
                </PaletteContainer>
            </PaletteWrapper>
        )
    }
}

export default withRouter(ColorShades);