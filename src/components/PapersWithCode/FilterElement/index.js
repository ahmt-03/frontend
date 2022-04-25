import React, { Fragment } from 'react';
import { Box, Typography, makeStyles, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
	},
	filterBoxWrapper: {
		maxHeight: '20vh',
		overflowY: 'scroll'
	}
}));

function FilterElement({ item, index, setUrl }) {
	const classes = useStyles();
	return (
		<Fragment key={index}>
			<Box className={classes.root}>
				<Box className={classes.content}>
					<Typography className={classes.filterName}>{item.filterName}</Typography>
					<Box className={classes.filterBoxWrapper}>
						{item.filterItems.map((filterItem, idx) => {
							return (
								<Button
									fullWidth
									className={classes.filterBox}
									key={idx}
									onClick={() => {
										setUrl(filterItem.filterItemUrl);
									}}
									endIcon={!filterItem.filterItemNumber && <CloseIcon />}
								>
									<Typography>{filterItem.filterItemName}</Typography>
									<Typography>{filterItem.filterItemNumber}</Typography>
								</Button>
							);
						})}
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
}

export default FilterElement;
