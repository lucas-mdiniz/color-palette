import React, {Component} from 'react';
import ColorBox from './ColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import {GridItem, GridContainer} from './GridSystem';
import {Link} from 'react-router-dom';

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    background: rgba(255,255,255,.3);
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 7px 14px;
    color: #fff;
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
                                <ColorBox 
                                    numberOfShades={this.props.numberOfShades} 
                                    color={color.color} 
                                    name={color.colorName}
                                    copyToClipboard
                                    luminanceLevel={this.state.luminanceSlider} 
                                    colorFormat={this.state.colorFormat}
                                >
                                    <StyledLink to={{
                                        pathname: `/shades/${this.props.name}`,
                                        state: {
                                            color: this.props.color
                                        }
                                    }}>More</StyledLink>
                                </ColorBox>
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
                <GridContainer  onClick={this.teste}>
                    {paletteRender}
                </GridContainer>
            </PaletteWrapper>
        )
    }
}

export default Palette;