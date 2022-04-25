import React, { Fragment } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginTop: theme.spacing(2)
	},
	link: {
		textDecoration: 'none',
		color: 'blue',
		cursor: 'pointer',
		marginRight: theme.spacing(6)
	}
}));

function PaginationElement({ data, setUrl, url }) {
	const classes = useStyles();
	const nIndex = data.findIndex((item) => item.pageName === 'Next');
	const pIndex = data.findIndex((item) => item.pageName === 'Previous');
	const getPageValue = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.page;
		if (value) {
			return Number(value);
		} else {
			return 1;
		}
	};
	const [ page, setPage ] = React.useState(getPageValue());
	const handleChange = (s) => {
		const parameters = queryString.parseUrl(url);
		if (s === 'p') {
			parameters.query.page = page - 1;
			setPage(page - 1);
		} else {
			parameters.query.page = page + 1;
			setPage(page + 1);
		}
		setUrl(queryString.stringifyUrl(parameters));
	};

	return (
		<Fragment>
			<Box className={classes.root}>
				{pIndex > -1 && (
					<Typography className={classes.link} onClick={() => handleChange('p')}>
						Previous
					</Typography>
				)}
				{nIndex > -1 && (
					<Typography className={classes.link} onClick={() => handleChange('n')}>
						Next
					</Typography>
				)}
			</Box>
		</Fragment>
	);
}

export default PaginationElement;
