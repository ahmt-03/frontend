import React, { Fragment } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { capitalizeFirstLetter, capitalizeWords, toSnakeCase } from '../../../utils';

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

function FilterElement({ item, index, setUrl, url }) {
	const classes = useStyles();
	const handleChange = (event) => {
		setUrl((prevUrl) => {
			if (event.target.checked) {
				return `${prevUrl}&${toSnakeCase(item.filterHeading)}=${event.target.name}`;
			} else {
				return prevUrl.replace(`&${toSnakeCase(item.filterHeading)}=${event.target.name}`, '');
			}
		});
	};
	return (
		<Fragment key={index}>
			<Box className={classes.root}>
				<Box className={classes.content}>
					<Typography className={classes.filterName}>{capitalizeWords(item.filterHeading)}</Typography>
					<Box>
						{item.filterListings&&item.filterListings.map((filterItem, idx) => {
							return (
								<Fragment key={idx}>
									<Box>
										<FormControlLabel
											control={
												<Checkbox
													checked={filterItem.isChecked}
													onChange={handleChange}
													name={filterItem.filterTextName}
													color="primary"
												/>
											}
											label={`${capitalizeFirstLetter(
												filterItem.filterTextName
											)} ${filterItem.filterTextNumber}`}
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
