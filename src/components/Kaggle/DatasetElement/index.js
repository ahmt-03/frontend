import React, { Fragment } from 'react';
import { Typography, Divider, makeStyles, Grid } from '@material-ui/core';
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
		width: '100%'
	},
	authorWrapper: {
		display: 'flex',
		alignItems: 'center'
	},
	authorIcon: {
		fontSize: '10px',
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5)
	}
}));

function DatasetElement({ item, index }) {
	const classes = useStyles();
	const { commonActions } = React.useContext(CommonContext);
	const onClick = () => {
		commonActions.commonStateChanged(item.url);
		window.open(item.url);
	};
	return (
		<Fragment key={index}>
			<Grid container spacing={2} className={classes.root} onClick={onClick}>
				{item.imageUrl && (
					<Grid item sm={2}>
						<img variant="square" alt="dataset-imageHere" src={item.imageUrl} className={classes.avatar} />
					</Grid>
				)}
				<Grid item sm={10}>
					<Typography className={classes.title}>{item.title}</Typography>
					<br />
					{item.author ? (
						<Fragment>
							<Typography className={classes.authorWrapper}>
								<span onClick={() => window.open(item.authorUrl)}>{item.author}</span>
								<span>
									<FiberManualRecordIcon className={classes.authorIcon} />
								</span>
								<span>{`Updated ` + item.datasetDescription[1]}</span>
							</Typography>
							<br />
						</Fragment>
					) : (
						<Fragment>
							<Typography className={classes.authorWrapper}>
								<span>{item.datasetDescription[0]}</span>
							</Typography>
							<br />
						</Fragment>
					)}
					<Typography>
						<span>{item.datasetDescription[2]}</span>
					</Typography>
					<br />
				</Grid>
			</Grid>
			<br />
			<Divider />
		</Fragment>
	);
}

export default DatasetElement;
