import React, { Component } from 'react';
import { Text, Layer, Group, Image } from 'react-konva';

export const SmallTextContainer = (props) => {
     
    const nameProps = {
        width: props.canvasData.width,
        align: "center",
        text: props.textData.name,
        fontSize: 32,
        fill: props.textData.color,    
        y:0
    }; 
    const emailProps = {
        width: props.canvasData.width,
        align: "center",
        text: props.textData.email,
        fontSize: 24,
        fill: props.textData.color,    
        y:nameProps.fontSize + 24,
    }; 
    const phoneProps = {
        width: props.canvasData.width,
        align: "center",
        text: props.textData.phone,
        fontSize: 24,
        fill: props.textData.color,    
        y: (nameProps.fontSize + emailProps.fontSize) * 2,
    }; 
    return(
        <Group
        y={(props.canvasData.height / 4 )}
        >
            <Text 
            {...nameProps}/>
            <Text 
            {...phoneProps}/>
            <Text 
            {...emailProps}/>
        </Group>
    )
}
