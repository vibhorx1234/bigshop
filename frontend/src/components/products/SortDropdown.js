import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { SORT_OPTIONS } from '../../utils/constants';

const SortDropdown = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={value}
        label="Sort By"
        onChange={(e) => onChange(e.target.value)}
        sx={{
          borderRadius: 3
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortDropdown;