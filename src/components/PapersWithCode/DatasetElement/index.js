import React, { Fragment } from 'react';
import { Typography, Divider, makeStyles, Avatar, Grid } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { CommonContext } from '../../../context/commonContext';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(2),
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
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
	avatar: {
		// margin: theme.spacing(1),
		width: '100%'
	}
	// imageBox: {
	// 	flex: 0.2
	// }
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
				{item.imageUrl && (
					<Grid item sm={2}>
						<img variant="square" alt="dataset-image" src={item.imageUrl} className={classes.avatar} />
					</Grid>
				)}
				<Grid item sm={10}>
					<Typography className={classes.title}>{item.title}</Typography>
					<br />
					<Typography>
						{item.description.slice(0, 247)}
						{item.description.length > 247 ? '...' : ''}
					</Typography>
					<br />
					<Typography className={classes.descriptionHelper}>
						<span> {item.papers} </span>
						<FiberManualRecordIcon style={{ fontSize: 10 }} />
						<span> {item.benchmarks} </span>
					</Typography>
				</Grid>
			</Grid>
			<br />
			<Divider />
		</Fragment>
	);
}

export default DatasetElement;
