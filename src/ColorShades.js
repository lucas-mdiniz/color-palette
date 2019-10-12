import React, {Component} from 'react';
import { withRouter } from "react-router";
import chroma from "chroma-js";
import ColorBox from './ColorBox';
import PaletteHeader from './PaletteHeader';


class ColorShades extends Component{

    static defaultProps = {
        paleteSize: 8
    }

    colorShades(){
        const 
            color = this.props.location.state.color,
            step = 1/(this.props.paleteSize + 2);
        console.log(step);
        
        let colorShadesArray = [];

        for(let i = step; i<=1-step; i+=step){
            colorShadesArray.push(chroma(color).luminance(i).hex());
        }

        return colorShadesArray;
    }

    render(){
        
        return(
            <div>
                <PaletteHeader></PaletteHeader>
                {this.colorShades().map(color => <ColorBox color={color}/>)}
            </div>
        )
    }
}

export default withRouter(ColorShades);