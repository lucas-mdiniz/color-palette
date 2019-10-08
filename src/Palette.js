import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Grid from '@material-ui/core/Grid';
import PaletteHeader from './PaletteHeader';

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
            .colors).map(color => <Grid item xs={12} sm={4} md={3}><ColorBox color={color[1]} colorFormat={this.state.colorFormat} name={color[0]}/></Grid>);  
        } else {
            paletteRender = <p>loading</p>
        }
    
        return(
            <Grid container>
                <PaletteHeader colorFormat={this.handleFormat}></PaletteHeader>
                {paletteRender}
            </Grid>
        )
    }
}

export default Palette;