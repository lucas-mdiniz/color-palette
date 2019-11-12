import chroma from "chroma-js";
import color from "chroma-js";

function generateColorShades(color){
    let array = chroma.scale(['fff',color, '000']).colors(12);
    
    array.pop();
    array.shift();

    return array;
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