import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader'
import { SketchPicker } from 'react-color';
import {useDispatch,useSelector} from 'react-redux';
import {initText} from '../../action/SidebarAction';
const theme = createMuiTheme({
  overrides: {
    MuiExpansionPanelDetails: {
      root:{
        display: 'block'
      }
    },
  },
});

export const EditCanvas = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    name : '',
    email : '',
    phone : '',
    csvData : false,
    logo : false,
    color: '#000000'
  })

  const handleUploadCsv = (val, fileName) =>{
    let data = {...value}
    data.name = val[0][0]
    data.email = val[0][1]
    data.phone = val[0][2]
    data.csvData = val
    setValue(data);
  }

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
  const handleChange = (name) => (event) => {
    setValue({...value,
    [name]: event.target.value});
  };
  const handleColorChange = (color) => {
    let data = {...value}
    data.color = color.hex
    setValue(data);
  };

  React.useEffect(() => {
    dispatch(initText(value))
  }, [handleChange,handleColorChange , EditCanvas,handleUploadCsv, handleUpload])
  
  return (
    <ThemeProvider theme={theme}>
      <ExpansionPanel >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="bgcust"
        >
          <Typography >Edit</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box mb={1}>
            <label htmlFor='logoImg'>
                <Button variant="contained" component="span" color="primary" >Logo</Button>
            </label>
              <input accept="image/*" type='file' id='logoImg' onChange={handleUpload('logo')} style={{display: 'none'}} />
          </Box>
          <Box>
            <TextField fullWidth label="Name" onChange={handleChange('name')} disabled={value.csvData} value={value.name}/>
          </Box>
          <Box>
            <TextField fullWidth label="Email" onChange={handleChange('email')} disabled={value.csvData} value={value.email}/>
          </Box>
          <Box mb={2}>
            <TextField fullWidth label="Phone" onChange={handleChange('phone')} disabled={value.csvData} value={value.phone}/>
          </Box>
          <Box mb={2}>
          <CSVReader
              cssClass="csv-reader-input"
              label={(
                <label htmlFor='uploadCsv'>
                    <Button variant="contained" component="span" color="primary" >Import CSV</Button>
                </label>
              )}
              onFileLoaded={handleUploadCsv}
              inputId="uploadCsv"
              inputStyle={{display: 'none'}}
            />
          </Box>
          <Box >
          <Typography >Text Color</Typography>
          <SketchPicker
            color={ value.color }
            onChangeComplete={ handleColorChange }
          />
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ThemeProvider>
  );
}

 