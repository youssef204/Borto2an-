import * as React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckboxes({onClick}) {
  return (
    <div>
      <Checkbox
      onClick = {onClick}
        {...label}
        sx={{
          color: "#ee0000",
          '&.Mui-checked': {
            color: "#ee0000",
          },
        }}
      />
    </div>
  );
}