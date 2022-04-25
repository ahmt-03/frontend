import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../context/authContext';
import {
	//API_ENDPOINT,
	forwardTo
} from '../../utils';
// import request from 'superagent';
import clsx from 'clsx';

const useStyles = (props) =>
	makeStyles((theme) => ({
		root: {
			flexGrow: 1
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		title: {
			flexGrow: 1,
			cursor: 'pointer'
		},
		textDec: {
			textDecoration: 'underline'
		},
		appColor: {
			backgroundColor: '#1674E2'
		},
		heading: {
			fontWeight: 'bold',
			paddingLeft: theme.spacing(2),
			paddingTop: theme.spacing(2)
		}
	}));

export default function Header(props) {
	const classes = useStyles(props)();
	const { authState, authActions } = React.useContext(AuthContext);

	const handleLogout = () => {
		authActions.authStateChanged(null);
		localStorage.removeItem('token');
		forwardTo('/login');
		// request.post(`${API_ENDPOINT}/api/auth/logout`).withCredentials().set('Accept', 'application/json').then(() => {
		// 	forwardTo('/login');
		// });
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.appColor}>
				<Toolbar style={{ marginLeft: 'auto' }}>
					{/* <Typography
						variant="body2"
						className={clsx(classes.title, props.path.includes('zenodo') && classes.textDec)}
						onClick={() => forwardTo('/zenodo')}
					>
						Zenodo
					</Typography>
					<Typography
						variant="body2"
						className={clsx(classes.title, props.path.includes('paperswithcode') && classes.textDec)}
						onClick={() => forwardTo('/paperswithcode')}
					>
						PapersWithCode
					</Typography>
					<Typography
						variant="body2"
						className={clsx(classes.title, props.path.includes('datasetsearch') && classes.textDec)}
						onClick={() => forwardTo('/datasetsearch')}
					>
						DatasetSearch
					</Typography>
					<Typography
						variant="body2"
						className={clsx(classes.title, props.path.includes('microsoftresearch') && classes.textDec)}
						onClick={() => forwardTo('/microsoftresearch')}
					>
						Microsoft Research
					</Typography>
					<Typography
						variant="body2"
						className={clsx(classes.title, props.path.includes('kaggle') && classes.textDec)}
						onClick={() => forwardTo('/kaggle')}
					>
						Kaggle
					</Typography> */}
					{authState.user ? (
						<Fragment>
							<Button color="inherit">{`Hi ${authState.user.name}`}</Button>
							<Button color="inherit" onClick={handleLogout}>{`Logout`}</Button>
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" onClick={() => forwardTo('login')}>
								{'Login'}
							</Button>
							<Button color="inherit" onClick={() => forwardTo('signup')}>
								{'Signup'}
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
			{authState.user && (
				<Typography variant="h6" className={classes.heading}>
					{' '}
					Dataset Search{' '}
				</Typography>
			)}
		</div>
	);
}
