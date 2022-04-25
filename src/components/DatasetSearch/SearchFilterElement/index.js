import React, { Fragment } from 'react';
import { Box, makeStyles, TextField, InputAdornment, FormControlLabel, Checkbox } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { DATASETSEARCH_URL } from '../../../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		border: '1px solid rgba(0,0,0,.1)',
		borderRadius: theme.spacing(1)
	},
	content: {
		padding: theme.spacing(2)
	},
	searchTextField: {
		marginBottom: theme.spacing(2)
	}
}));

function SearchFilterElement({ search, setSearch, setBodyAttributes, bodyAttributes }) {
	const classes = useStyles();
	const handleChange = (event) => {
		const newFilters = { ...bodyAttributes.filters };
		newFilters['free'] = event.target.checked;
		setBodyAttributes({ ...bodyAttributes, filters: newFilters });
	};
	return (
		<Fragment>
			<Box className={classes.root}>
				<Box className={classes.content}>
					<TextField
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className={classes.searchTextField}
						fullWidth
						variant="outlined"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon
										style={{ cursor: 'pointer' }}
										onClick={() =>
											setBodyAttributes({
												...bodyAttributes,
												url: `${DATASETSEARCH_URL}?query=${search}`
											})}
									/>
								</InputAdornment>
							)
						}}
					/>
					<Box>
						<FormControlLabel
							control={
								<Checkbox
									checked={bodyAttributes.filters.free}
									onChange={handleChange}
									name={'Free'}
									value={bodyAttributes.filters.free}
									color="primary"
								/>
							}
							label={`Free`}
						/>
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
}

export default SearchFilterElement;
