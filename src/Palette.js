import React, {Component} from 'react';
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
    height: 25%;
`;

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;



class Palette extends Component{
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
        let paletteRender;

        if(this.props.palettes.length !== 0){
            paletteRender = Object.entries(this.props.palettes.filter(palette => palette.id === this.props.urlParams.match.params.id)[0]
            .colors).map(color => <GridItem><ColorBox color={color[1]} colorFormat={this.state.colorFormat} name={color[0]} hasMore={true}/></GridItem>);  
        } else {
            paletteRender = <p>loading</p>
        }
    
        return(
            <PaletteWrapper>
                <PaletteHeader colorFormat={this.handleFormat}></PaletteHeader>
                <Container>
                    {paletteRender}
                </Container>
            </PaletteWrapper>
        )
    }
}

export default Palette;