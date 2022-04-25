import React, { Fragment } from 'react';
import { Typography, Divider, makeStyles, Grid } from '@material-ui/core';
import queryString from 'query-string';
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
		width: '100%'
	}
}));

function DatasetElement({ item, index }) {
	const classes = useStyles();
	const { commonActions } = React.useContext(CommonContext);
	const onClick = () => {
		const baseurl = queryString.parseUrl(item.finalUrl);
		baseurl.query.docid = item.docid;
		commonActions.commonStateChanged(queryString.stringifyUrl(baseurl));
		window.open(queryString.stringifyUrl(baseurl));
	};
	return (
		<Fragment key={index}>
			<Grid container spacing={2} className={classes.root} onClick={onClick}>
				{item.imageUrl && (
					<Grid item sm={2}>
						<img variant="square" alt="dataset-image" src={item.imageUrl} className={classes.avatar} />
					</Grid>
				)}
				<Grid item sm={10}>
					<Typography className={classes.title}>{item.title}</Typography>
					<br />
					<Typography>
						{item.datasetUrl.map((url, index) => <span key={`${index}${url}`}>{url}</span>)}
					</Typography>
					<br />
					{item.datasetType && (
						<Fragment>
							<Typography>
								<span>{item.datasetType}</span>
							</Typography>
							<br />
						</Fragment>
					)}
					{item.updatedDate && (
						<Typography>
							<span>{item.updatedDate}</span>
						</Typography>
					)}
				</Grid>
			</Grid>
			<br />
			<Divider />
		</Fragment>
	);
}

export default DatasetElement;
