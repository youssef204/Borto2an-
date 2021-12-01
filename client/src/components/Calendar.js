import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function Calendar({label,selected,onChange,value,minDate,maxDate}) {
  //const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}