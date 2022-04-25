import React, { Fragment, useState } from 'react';
import { Typography, Divider, makeStyles, Grid, CircularProgress, Backdrop } from '@material-ui/core';
import request from 'superagent';
import { API_ENDPOINT } from '../../../utils';
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
	},
	datasetDescription: {
		color: 'grey'
	},
	backdrop: {
		backgroundColor: 'white'
	}
}));

function DatasetElement({ item, index, url }) {
	const classes = useStyles();
	const [ loading, setLoading ] = useState(false);
	const { commonActions } = React.useContext(CommonContext);
	const handleClick = (index) => {
		setLoading(true);
		request
			.post(`${API_ENDPOINT}/api/microsoftresearch/datasetUrl`)
			.send({ url, index })
			.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
			.set('Accept', 'application/json')
			.then((res) => {
				commonActions.commonStateChanged(res.body.url);
				window.open(res.body.url);
				setLoading(false);
			});
	};
	return (
		<Fragment key={index}>
			{loading && (
				<Backdrop className={classes.backdrop} open>
					<CircularProgress size={50} />
				</Backdrop>
			)}
			<Grid container spacing={2} className={classes.root} onClick={() => handleClick(item.index)}>
				<Grid item sm={9}>
					<Typography className={classes.title}>{item.title}</Typography>
					<Typography className={classes.datasetDescription}>{item.datasetDescription}</Typography>
					<br />

					<Typography>{item.datasetDetailDescription}</Typography>
					<br />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.title}>{`File Types : ${item.fileTypes}`}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.title}>{`${item.lastModifiedDate}`}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.title}>{`${item.license[0]}`}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography className={classes.title}>{`${item.license[1]}`}</Typography>
				</Grid>
			</Grid>

			<br />
			<Divider />
		</Fragment>
	);
}

export default DatasetElement;
