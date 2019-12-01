import React, {Component} from 'react';
import CopyColorBox from './CopyColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import {GridItem, GridContainer} from './GridSystem';
import {Link} from 'react-router-dom';
import {colorFormat} from './Helper';
import chroma from 'chroma-js';

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => chroma(props.color).luminance() > 0.4 ? '#000' : '#fff'};
    background: ${props => chroma(props.color).luminance() > 0.4 ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,.3)'};
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 7px 14px;
`;


class Palette extends Component{
    constructor(){
        super();

        this.state = {
            colorFormat: 'hex',
            luminanceSlider: 400,
            copied: false
        }

        this.handleFormat = this.handleFormat.bind(this);
        this.handleLuminance = this.handleLuminance.bind(this);
    }

    handleFormat(colorFormat){
        this.setState({colorFormat});
    }

    handleLuminance(luminanceSlider){
        this.setState({luminanceSlider});
    }


    render(){
        let paletteRender;
        if(this.props.palettes.length !== 0){
            paletteRender = 
                this.props.palettes
                    .filter(palette => palette.id === this.props.urlParams.match.params.id)[0].colors
                    .map(color => 
                        <GridItem cols={5} rows={4} key={color.colorName}>
                            <CopyColorBox  
                                color={colorFormat(color.shades[this.state.luminanceSlider], this.state.colorFormat)} 
                                name={color.colorName}
                            >
                                <StyledLink to={{
                                    pathname: `/shades/${color.colorName}`,
                                    state: {
                                        color: color.shades
                                    }
                                }}
                                color={color.shades[this.state.luminanceSlider]}>
                                    More
                                </StyledLink>
                            </CopyColorBox>
                        </GridItem>);  
        } else {
            paletteRender = <p>loading</p>
        }
    
        return(
            <PaletteWrapper>
                <PaletteHeader 
                    colorFormat={this.handleFormat} 
                    luminanceSlider={this.handleLuminance} 
                    luminanceOn
                />
                <GridContainer>
                    {paletteRender}
                </GridContainer>
            </PaletteWrapper>
        )
    }
}

export default Palette;