import React, { Component } from 'react';
import { Stage, Layer, Text, Image, Group } from 'react-konva';
import {useDispatch,useSelector} from 'react-redux';
import useImage from 'use-image';
import {SmallTextContainer} from './FrontText/SmallTextContainer';
import {LargeTextContainer} from './FrontText/LargeTextContainer';
import jsPDF from 'jspdf';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export const CanvasFrontContent  = (props) => {
  const textData = useSelector(state => state.data.textData);
  const [canvas, setCanvas] = React.useState({
    width: 0, 
    height: 0,
    bleedWidth: 0,
    bleedHeight: 0,
    bgImage: '',
    type: 'square',
  }); 
  const [image] = useImage(canvas.bgImage);
  const inputRefs = [];
  const setRef = (ref) => {
    inputRefs.push(ref);
  };
  React.useEffect(() => {
    let init = {...canvas}
    init.width = props.canvasData.width;
    init.height = props.canvasData.height;
    init.bleedWidth = props.canvasData.bleedWidth;
    init.bleedHeight = props.canvasData.bleedHeight;
    init.bgImage = props.canvasData.frontImage;
    init.type = props.canvasData.type;
    setCanvas(init)
  },[props.canvasData,textData])
  const handlePrint = () => {
    const pdf = new jsPDF('p','px','a4');

    var pageHeight = 842;  
    var position = 10;

    if(canvas.type == 'square'){
      var imgWidth = 187.5;
      var imgHeight = 187.5;
    }else{
      var imgWidth = 265.75;
      var imgHeight = 162.5;
    }
    inputRefs.forEach((stage,index) => {
      var heightLeft = pageHeight
      pdf.addImage(stage.toDataURL({
        pixelRatio: 2 // or other value you need
      }), 'PNG', 10, position, imgWidth, imgHeight); 
      position += imgHeight + 10;
      heightLeft -= position;
      while(position >= heightLeft) {
        pdf.addPage();
        heightLeft = pageHeight;
        position = 10;
        pdf.addImage(stage.toDataURL(), 'PNG', 10, position, imgWidth, imgHeight); 
        heightLeft -= position;
      }
    });

    pdf.save("frontPrint.pdf");  
  }
  return (
  <>
    <Stage 
    width={canvas.width + canvas.bleedWidth} height={canvas.height + canvas.bleedHeight}
    >
      <Layer
      >
        {/* bleed */}
        <Image 
            width={canvas.width + canvas.bleedWidth } 
            height={canvas.height + canvas.bleedHeight}
            strokeWidth={1} // border width
            fill="#E2E6EA"
            stroke="red" // border color
        />
        
        {/* background */}
        <Image image={image}
                draggable
        />
        <Image 
          x={canvas.bleedWidth / 2}
          y={canvas.bleedHeight / 2}
          width={canvas.width} height={canvas.height}
          strokeWidth={1} // border width
          stroke="blue" // border color
          />
      </Layer>
      <Layer
            x={canvas.bleedWidth / 2}
            y={canvas.bleedHeight}
        >
          {canvas.type =='square' ?
            <SmallTextContainer canvasData={canvas} textData={textData}/>
          :
            <LargeTextContainer canvasData={canvas} textData={textData}/>
          }
      </Layer>
    </Stage>
    <div style={{display: 'none'}}>
    {textData.csvData? 
      textData.csvData.map(text => {
        let data = {
          "name": text[0],
          "email": text[1],
          "phone": text[2],
          "logo": textData.logo,
          "color": textData.color
        }
        return(
          <Stage ref={setRef}
          width={canvas.width + canvas.bleedWidth} height={canvas.height + canvas.bleedHeight}
          >
            <Layer
            >
              {/* bleed */}
              <Image 
                  width={canvas.width + canvas.bleedWidth } 
                  height={canvas.height + canvas.bleedHeight}
                  strokeWidth={1} // border width
                  fill="#E2E6EA"
                  stroke="red" // border color
              />
              
              {/* background */}
              <Image image={image}
                      draggable
              />
              <Image 
                x={canvas.bleedWidth / 2}
                y={canvas.bleedHeight / 2}
                width={canvas.width} height={canvas.height}
                strokeWidth={1} // border width
                stroke="blue" // border color
                />
            </Layer>
            <Layer
                  x={canvas.bleedWidth / 2}
                  y={canvas.bleedHeight}
              >
                {canvas.type =='square' ?
                  <SmallTextContainer canvasData={canvas} textData={textData}/>
                :
                  <LargeTextContainer canvasData={canvas} textData={textData}/>
                }
            </Layer>
          </Stage>
        )
      })
        :
        <Stage ref={setRef}
        width={canvas.width + canvas.bleedWidth} height={canvas.height + canvas.bleedHeight}
        >
          <Layer
          >
            {/* bleed */}
            <Image 
                width={canvas.width + canvas.bleedWidth } 
                height={canvas.height + canvas.bleedHeight}
                strokeWidth={1} // border width
                fill="#E2E6EA"
                stroke="red" // border color
            />
            
            {/* background */}
            <Image image={image}
                    draggable
            />
            <Image 
              x={canvas.bleedWidth / 2}
              y={canvas.bleedHeight / 2}
              width={canvas.width} height={canvas.height}
              strokeWidth={1} // border width
              stroke="blue" // border color
              />
          </Layer>
          <Layer
                x={canvas.bleedWidth / 2}
                y={canvas.bleedHeight}
            >
              {canvas.type =='square' ?
                <SmallTextContainer canvasData={canvas} textData={textData}/>
              :
                <LargeTextContainer canvasData={canvas} textData={textData}/>
              }
          </Layer>
        </Stage>
      }
    </div>
    <Box mt={2}>
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Print Front Cover
      </Button>
    </Box>
  </>
  ); 
}

