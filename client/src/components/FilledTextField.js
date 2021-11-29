import * as React from 'react';
import TextField from '@mui/material/TextField';
import { height } from '@mui/system';

export default function FilledTextField({label , height , width , fontsize ,onChange , value , name}) {
  return (
      <TextField id="filled-basic" label={label} variant="filled" style={{height:height,width:width}} 
      value = {value}
      name = {name}
      inputProps={{style: {fontSize: fontsize}}} 
      InputLabelProps={{style: {fontSize: fontsize}}} 
      onChange={onChange} />
  );
}