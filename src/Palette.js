import React, {Component} from 'react';
import ColorBox from './ColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import GridItem from './GridItem';
import PaletteContainer from './PaletteContainer';

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;


class Palette extends Component{
    constructor(){
        super();

        this.state = {
            colorFormat: 'hex',
            luminanceSlider: 400
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
                Object.entries(this.props.palettes
                    .filter(palette => palette.id === this.props.urlParams.match.params.id)[0].colors)
                    .map(color => <GridItem cols={5} rows={4}>
                                        <ColorBox 
                                            numberOfShades={this.props.numberOfShades} 
                                            color={color[1]} 
                                            name={color[0]}
                                            luminanceLevel={this.state.luminanceSlider} 
                                            colorFormat={this.state.colorFormat}
                                            hasMore={true}/>
                                    </GridItem>);  
        } else {
            paletteRender = <p>loading</p>
        }
    
        return(
            <PaletteWrapper>
                <PaletteHeader 
                    colorFormat={this.handleFormat} 
                    luminanceSlider={this.handleLuminance} 
                    luminanceOn/>
                <PaletteContainer>
                    {paletteRender}
                </PaletteContainer>
            </PaletteWrapper>
        )
    }
}

export default Palette;