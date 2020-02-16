import React, { Component } from 'react';
import { Text, Layer, Group, Image } from 'react-konva';
import useImage from 'use-image';

export const SmallTextContainer = (props) => {
    const [image] = useImage(props.textData.logo);
     
    const imgProps = {
        width: 250,
        height: 250,
        image: image,
    }; 
    return(
        <Group
        y={(props.canvasData.height / 12 )}
        x={props.canvasData.width / 2 - 125}
        align= 'center'
        >
            <Image {...imgProps}/>
        </Group>
    )
}
