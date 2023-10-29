import React, { Fragment } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

function FilterElement({ item, index, bodyAttributes, setBodyAttributes }) {
	const classes = useStyles();
	const handleChange = (event) => {
		if (event.target.checked) {
			const newFilters = { ...bodyAttributes.filters };
			newFilters[item.filterItemKey] = event.target.value;
			setBodyAttributes({ ...bodyAttributes, filters: newFilters });
		} else {
			const newFilters = { ...bodyAttributes.filters };
			newFilters[item.filterItemKey] = 'All';
			setBodyAttributes({ ...bodyAttributes, filters: newFilters });
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
													checked={
														bodyAttributes.filters[item.filterItemKey] ===
														filterItem.filterItemValue
													}
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
