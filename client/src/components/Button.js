import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({index,width,height,onClick,label}) {
  return (
      <Button variant="contained"
      style={{
        width : width,
        height : height,
        backgroundColor: index == 1 ? "#ee0000" : "#cdcdcd",
        padding: "10px 20px",
        fontSize: 14,
        color : index == 1 ? "#FFFFFF" : "#eeeeee"
    }}
    onClick={onClick}>
    {label}</Button>
  );
}