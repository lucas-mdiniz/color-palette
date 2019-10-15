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
    width: 25%;
    height: 50%;
`;

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;

class ColorShades extends Component{

    static defaultProps = {
        paleteSize: 8 
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
            step = 1/(this.props.paleteSize + 1);
        
        let colorShadesArray = [];

        for(let i = step; i<=Math.ceil(1-step); i+=step){
            if(colorShadesArray.length <this.props.paleteSize){
                colorShadesArray.push(chroma(color).luminance(i).hex());
            }
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