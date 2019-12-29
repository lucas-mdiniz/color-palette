import React, {useContext} from 'react';
import { withRouter } from "react-router";
import CopyColorBox from './CopyColorBox';
import PaletteHeader from './PaletteHeader';
import styled from 'styled-components';
import PaletteContainer from './PaletteContainer';
import {GridItem} from './GridSystem';
import {changeColorFormat} from './Helper';
import {ColorFormatContext} from './context/ColorFormatContext'

const PaletteWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
`;

function ColorShades(props){

    const [colorFormat,] = useContext(ColorFormatContext);

    const colors = props.location.state.color;
    const colorName = props.urlParams.match.params.color;

    return(
        <PaletteWrapper>
            <PaletteHeader backButton/>
            <PaletteContainer>
                {Object.keys(colors).map(color => 
                    <GridItem key={`${colorName} ${color}`} cols={5} rows={2}>
                        <CopyColorBox color={changeColorFormat(colors[color], colorFormat)} name={`${colorName} ${color}`}/>
                    </GridItem>
                )}
            </PaletteContainer>
        </PaletteWrapper>
    )
}


export default withRouter(ColorShades);