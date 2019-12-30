import React, {createContext, useState} from 'react';

export const ColorFormatContext = createContext('hex');

export function ColorFormatProvider(props){

    const [colorFormat, setColorFormat] = useState('hex');

    const handleColorFormat = e => {
        setColorFormat(e.target.value)
    }

    return(
        <ColorFormatContext.Provider value={[colorFormat, handleColorFormat]}>
            {props.children}
        </ColorFormatContext.Provider>
    )
}