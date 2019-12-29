import React, {useState, useContext} from 'react';
import CopyColorBox from './CopyColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import {GridItem, GridContainer} from './GridSystem';
import {Link} from 'react-router-dom';
import {changeColorFormat} from './Helper';
import chroma from 'chroma-js';
import {ColorFormatContext} from './context/ColorFormatContext';


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

function Palette(props){
    const [colorFormat,] = useContext(ColorFormatContext);

    const [luminanceSlider, setLuminance] = useState(400);

    const handleLuminance = luminanceSlider =>{
        setLuminance(luminanceSlider);
    };

    let paletteRender;

    if(props.palettes.length !== 0){
        paletteRender = 
            props.palettes
                .filter(palette => palette.id === props.urlParams.match.params.id)[0].colors
                .map(color => 
                    <GridItem cols={5} rows={4} key={color.colorName}>
                        <CopyColorBox  
                            color={changeColorFormat(color.shades[luminanceSlider], colorFormat)} 
                            name={color.colorName}
                        >
                            <StyledLink to={{
                                pathname: `/shades/${color.colorName}`,
                                state: {
                                    color: color.shades
                                }
                            }}
                            color={color.shades[luminanceSlider]}>
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
                changeLuminanceSlider={handleLuminance} 
                luminanceOn
            />
            <GridContainer>
                {paletteRender}
            </GridContainer>
        </PaletteWrapper>
    )
}

export default Palette;