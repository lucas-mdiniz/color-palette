import React, {Component} from 'react';
import { withRouter } from "react-router";
import chroma from "chroma-js";
import ColorBox from './ColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';



const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    flex-grow: 1;
`;

const GridItem = styled.div`
    width: 20%;
    height: 50%;
`;

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;

class ColorShades extends Component{

    static defaultProps = {
        paleteSize: 9 
    }

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

    colorShades(){
        const 
            color = this.props.location.state.color,
            luminance = chroma(color).luminance();

        let colorShadesArray = [],
            i=0,
            colorUp = luminance,
            colorDown = luminance,
            stepDown,
            stepUp;

        if(luminance < 0.5){
            stepUp = luminance/(this.props.paleteSize/2);
            stepDown = (1-luminance)/(this.props.paleteSize/2);
        } else{
            stepDown = luminance/(this.props.paleteSize/2);
            stepUp = (1-luminance)/(this.props.paleteSize/2);
        }

        while( i < (this.props.paleteSize/2) ){

            if( i === 0 ){
                colorShadesArray.push(color);
            }
            else{
                colorShadesArray.push(chroma(color).luminance(colorUp).hex());
                colorShadesArray.unshift(chroma(color).luminance(colorDown).hex());
            }

            colorUp -= stepUp;
            colorDown += stepDown;
            i++;
        }

        return colorShadesArray;
    }

    render(){
        return(
            <PaletteWrapper>
                <PaletteHeader colorFormat={this.handleFormat}></PaletteHeader>
                <Container>
                    {this.colorShades().map(color => <GridItem><ColorBox colorFormat={this.state.colorFormat} color={color}/></GridItem>)}
                </Container>
            </PaletteWrapper>
        )
    }
}

export default withRouter(ColorShades);