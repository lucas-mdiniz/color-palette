import chroma from "chroma-js";
import color from "chroma-js";

function generateColorShades(color){
    let array = chroma.scale(['fff',color, '000']).colors(12);
    
    array.pop();
    array.shift();
    

    let shades = {};

    array.forEach((color, index) => {
        
        let key = index*100;

        if(index === 0){
            shades[50] = color;
        } else {
            shades[key] = color;
        }
    });

    return shades;
}

function colorFormat(oldColor, format){
    if(format === 'hex'){
        return(color(oldColor).hex());
    } else if(format === 'rgb'){
        return(`rgb(${color(oldColor).rgb().map(color => color)})`);
    } else {
        return(`rgba(${color(oldColor).rgba().map(color => color)})`);
    }
}

export {generateColorShades, colorFormat};