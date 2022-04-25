import React, { Fragment } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		border: '1px solid rgba(0,0,0,.1)',
		borderRadius: theme.spacing(1)
	},
	filterName: {
		fontWeight: 'bold',
		marginBottom: theme.spacing(1)
	},
	content: {
		padding: theme.spacing(2)
	},
	filterBox: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(1),
		padding: theme.spacing(1),
		textTransform: 'none'
	}
}));

function FilterElement({ item, index, url, setUrl }) {
	const classes = useStyles();
	const filterItemKey = item.filterItemKey;
	const handleChange = (event) => {
		const parameters = queryString.parseUrl(url);
		if (event.target.checked) {
			if (filterItemKey !== 'filetypes') {
				parameters.query[item.filterItemKey] = event.target.value;
			} else {
				// join by comma
				const value = parameters.query[item.filterItemKey];
				if (value) {
					parameters.query[item.filterItemKey] = `${value},${event.target.value}`;
				} else {
					parameters.query[item.filterItemKey] = event.target.value;
				}
			}
		} else {
			if (filterItemKey !== 'filetypes') {
				delete parameters.query[item.filterItemKey];
			} else {
				const value = parameters.query[item.filterItemKey];
				const newValue = value.split(',').filter((val) => val !== event.target.value);
				if (newValue.join(',') === '') {
					delete parameters.query[item.filterItemKey];
				} else {
					parameters.query[item.filterItemKey] = newValue.join(',');
				}
			}
		}
		setUrl(queryString.stringifyUrl(parameters));
	};
	const isChecked = (filterItemValue) => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query[item.filterItemKey];
		if (value) {
			if (filterItemKey !== 'filetypes') {
				return value === filterItemValue;
			} else {
				return value.includes(filterItemValue);
			}
		} else {
			return false;
		}
	};
	return (
		<Fragment key={index}>
			<Box className={classes.root}>
				<Box className={classes.content}>
					<Typography className={classes.filterName}>{item.filterItemHeading}</Typography>
					<Box>
						{item.filterListings.map((filterItem, idx) => {
							return (
								<Fragment key={idx}>
									<Box>
										<FormControlLabel
											control={
												<Checkbox
													checked={isChecked(filterItem.filterItemValue)}
													onChange={handleChange}
													name={filterItem.filterItemName}
													value={filterItem.filterItemValue}
													color="primary"
												/>
											}
											label={`${filterItem.filterItemName}`}
										/>
									</Box>
								</Fragment>
							);
						})}
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
}

export default FilterElement;
