import React, {Component} from 'react';
import { withRouter } from "react-router";
import ColorBox from './ColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import {generateColorShades} from './Helper';



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

        return(
            <PaletteWrapper>
                <PaletteHeader colorFormat={this.handleFormat}/>
                <Container>
                    {generateColorShades(color).map(color => 
                        <GridItem>
                            <ColorBox colorFormat={this.state.colorFormat} color={color}/>
                        </GridItem>
                    )}
                </Container>
            </PaletteWrapper>
        )
    }
}

export default withRouter(ColorShades);