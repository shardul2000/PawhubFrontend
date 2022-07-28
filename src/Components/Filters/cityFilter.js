import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function CityFilter() {
	const [city, setCity] = useState('');

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	return (
		<Box sx={{ width: '10em' }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">City</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={city}
					label="City"
					onChange={handleChange}
				>
					<MenuItem value={'Halifax'}>Halifax</MenuItem>
					<MenuItem value={'Toronto'}>Toronto</MenuItem>
					<MenuItem value={'Montreal'}>Montreal</MenuItem>
					<MenuItem value={'Vancouver'}>Vancouver</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
