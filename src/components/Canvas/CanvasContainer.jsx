import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import {useDispatch,useSelector} from 'react-redux';
import {CanvasFrontContent} from './CanvasFrontContent';
import {CanvasBackContent} from './CanvasBackContent';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import { getStage } from 'react-konva';

export const CanvasContainer = (props) => {
  const bgData = useSelector(state => state.data.canvasData);
  const [show, setShow] = React.useState(false)
  const [canvas, setCanvas] = React.useState({
    type: 'square',
    width: 0,
    height: 0,
    bleedWidth: 0,
    bleedHeight: 0,
    frontImage: false,
    backImage: false
  }); 
  React.useEffect(() => {
    let size = {...canvas}
    if(bgData.size == 'square'){
      size.width = 675 / 2;
      size.height = 675 / 2;
      size.bleedWidth = 50;
      size.bleedHeight = 50;
    }else{
      size.width = 1050 / 2;
      size.height = 600 / 2;
      size.bleedWidth = 50; 
      size.bleedHeight = 50;
    }
    size.type = bgData.size
    size.frontImage = bgData.frontImg;
    size.backImage = bgData.backImg
    setCanvas(size)
  },[bgData])

  const toggleCanvas = () => {
    show ? 
      setShow(false)
    :
      setShow(true)
  }
  return (
      <>
        <Box style={{display: show? 'none':'block'}}>
          <Typography variant="h6">
            Front Design  
            <IconButton onClick={toggleCanvas}>
              <SwapHorizIcon/>
            </IconButton>
          </Typography>
            <CanvasFrontContent canvasData={canvas} />
        </Box>
        <Box style={{display: show? 'block':'none'}}>
            <Typography variant="h6">
              Back Design  
              <IconButton onClick={toggleCanvas}>
                <SwapHorizIcon/>
              </IconButton>
            </Typography>
            <CanvasBackContent canvasData={canvas} />
        </Box>
      </>
  );
}

