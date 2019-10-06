import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Grid from '@material-ui/core/Grid';
import PaletteHeader from './PaletteHeader';
import axios from 'axios';

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

        /*const paletteRender = Object.values(this.props.palettes.filter(palette => palette.id === this.props.urlParams.match.params.id)[0]
                .colors).map(color => <Grid item xs={12} sm={4} md={3}><ColorBox color={color} colorFormat={this.state.colorFormat}/></Grid>);*/

        return(
            <Grid container>
                <PaletteHeader colorFormat={this.handleFormat}></PaletteHeader>
                {Object.values(this.props.palettes.filter(palette => palette.id === this.props.urlParams.match.params.id)[0]
                .colors).map(color => <Grid item xs={12} sm={4} md={3}><ColorBox color={color} colorFormat={this.state.colorFormat}/></Grid>)}
            </Grid>
        )
    }
}

export default Palette;