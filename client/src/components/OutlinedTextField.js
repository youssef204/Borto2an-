import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function OutlinedTextField({label , height , width , fontsize ,onChange,value,name}) {
  return (
      <TextField id="outlined-basic" label={label} variant="outlined" style={{height:height,width:width}} 
      value = {value}
      name={name}
      inputProps={{style: {fontSize: fontsize}}} 
      InputLabelProps={{style: {fontSize: fontsize}}} 
      onChange={onChange}  />
  );
}