import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useDispatch}  from 'react-redux';
import {initCanvas} from '../../action/SidebarAction';
const theme = createMuiTheme({
  overrides: {
    MuiExpansionPanelDetails: {
      root:{
        display: 'block'
      }
    },
  },
});

export const BackgroundCustomize = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(
    {
      size: 'square',
      frontImg: false,
      backImg: false
    }
  );
  const handleChange = (event) => {
    let val = {...value}
    val['size'] = event.target.value
    
    setValue(val);
  };

  const handleUpload = (name) => (event) =>{
    const file = event.target.files[0]
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
        setValue({
          ...value,
          [name]: event.target.result,
        });
    };
    fileReader.readAsDataURL(file);
  }
  React.useEffect(() => {
    dispatch(initCanvas(value))
  }, [handleChange,handleUpload])


  return (
    <ThemeProvider theme={theme}>
      <ExpansionPanel >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="bgcust"
        >
          <Typography >Background Customize</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
              <Box p={2}>
              <label htmlFor='bgFront'>
                  <Button variant="contained" component="span" color="primary" >Front Image</Button>
              </label>
                <input accept="image/*" type='file' id='bgFront' onChange={handleUpload('frontImg')} style={{display: 'none'}} />
              </Box>
              <Box p={2}>
              <label htmlFor='bgBack'>
                  <Button variant="contained" component="span" color="primary" >Back Image</Button>
              </label>
                <input accept="image/*" type='file' id='bgBack' onChange={handleUpload('backImg')} style={{display: 'none'}} />
              </Box>
              <Box p={2}>
                <h4>Select Size</h4>
                <RadioGroup aria-label="size" name="size" value={value.size} onChange={handleChange}>
                  <FormControlLabel
                    value="square"
                    control={<Radio color="primary" />}
                    label="65mm"
                  />
                  <FormControlLabel
                    value="standard"
                    control={<Radio color="primary" />}
                    label="90 mm x 55 mm"
                  />
                </RadioGroup>
              </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ThemeProvider>
  );
}

