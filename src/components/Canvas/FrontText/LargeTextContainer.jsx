import React, { Component } from 'react';
import { Text, Layer, Group, Image } from 'react-konva';
import useImage from 'use-image';

export const LargeTextContainer = (props) => {
    const [image] = useImage(props.textData.logo);
     
    const nameProps = {
        align: "center",
        text: props.textData.name,
        fontSize: 32,
        fill: props.textData.color,    
        y:0
    }; 
    const emailProps = {
        align: "center",
        text: props.textData.email,
        fontSize: 24,
        fill: props.textData.color,    
        y:nameProps.fontSize + 24,
    }; 
    const phoneProps = {
        align: "center",
        text: props.textData.phone,
        fontSize: 24,
        fill: props.textData.color,    
        y: (nameProps.fontSize + emailProps.fontSize) * 2,
    }; 
    const imgProps = {
        width: 100,
        height: 100,
        image: image,
        x: props.canvasData.width / 2 + 100 
    };
    return(
        <Group
            x={24}
        >
            <Text 
            {...nameProps}/>
            <Text 
            {...phoneProps}/>
            <Text 
            {...emailProps}/>
            <Image {...imgProps}/>
        </Group>
    )
}
