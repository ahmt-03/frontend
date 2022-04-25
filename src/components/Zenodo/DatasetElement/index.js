import React, { Fragment } from 'react';
import { Box, Typography, Divider, makeStyles, Grid } from '@material-ui/core';
import { CommonContext } from '../../../context/commonContext';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(2),
		cursor: 'pointer'
	},
	descriptionHelper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: theme.spacing(0.5),
		fontSize: '0.8rem',
		color: '#888'
	},
	title: {
		fontWeight: 'bold'
	},
	spanClass: {
		fontSize: '0.8rem'
	}
}));

function DatasetElement({ item, index }) {
	const classes = useStyles();
	const { commonActions } = React.useContext(CommonContext);
	return (
		<Fragment key={index}>
			<Grid
				container
				spacing={2}
				className={classes.root}
				onClick={() => {
					commonActions.commonStateChanged(item.url);
					window.open(item.url);
				}}
			>
				<Grid item sm={9}>
					<Typography className={classes.title}>{item.title}</Typography>
					<Typography>
						{item.authors.map((author, index) => {
							return (
								<span className={classes.spanClass} key={index}>
									{author}
								</span>
							);
						})}
					</Typography>
					<br />
					<Box>
						{item.description.map((des, index) => {
							return (
								<Typography className={classes.spanClass} key={index}>
									{des}
								</Typography>
							);
						})}
					</Box>
				</Grid>
			</Grid>
			<br />
			<Divider />
		</Fragment>
	);
}

export default DatasetElement;
