import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Divider,
  Paper
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { formatPrice } from '../../utils/helpers';

const FilterPanel = ({ filters, onFilterChange, onReset, minPrice = 0, maxPrice = 600000 }) => {
  const handlePriceChange = (event, newValue) => {
    onFilterChange({
      ...filters,
      minPrice: newValue[0],
      maxPrice: newValue[1]
    });
  };

  const handleStockChange = (event) => {
    onFilterChange({
      ...filters,
      inStock: event.target.checked ? true : undefined
    });
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FilterList color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>
          Price Range
        </Typography>
        <Slider
          value={[filters.minPrice || minPrice, filters.maxPrice || maxPrice]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          step={5000}
          valueLabelFormat={(value) => formatPrice(value)}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(filters.minPrice || minPrice)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(filters.maxPrice || maxPrice)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Availability */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>
          Availability
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.inStock || false}
                onChange={handleStockChange}
              />
            }
            label="In Stock Only"
          />
        </FormGroup>
      </Box>

      <Button
        fullWidth
        variant="outlined"
        onClick={onReset}
        sx={{ mt: 2 }}
      >
        Reset Filters
      </Button>
    </Paper>
  );
};

export default FilterPanel;