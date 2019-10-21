import chroma from "chroma-js";

function generateColorShades(color){
    let array = chroma.scale(['fff',color, '000']).colors(12);
    
    array.pop();
    array.shift();

    return array;
}

export {generateColorShades};