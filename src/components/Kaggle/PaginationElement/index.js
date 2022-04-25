import React, { Fragment } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2)
	}
}));

function PaginationElement({ data, setUrl, url }) {
	const classes = useStyles();
	const fIndex = data.findIndex((item) => item.pageName === 'chevron_right');
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
	const handleChange = (event, value) => {
		setPage(value);
		const parameters = queryString.parseUrl(url);
		parameters.query.page = value;
		setUrl(queryString.stringifyUrl(parameters));
	};

	return (
		<Fragment>
			<Box className={classes.root}>
				<Pagination count={fIndex} page={page} onChange={handleChange} />
			</Box>
		</Fragment>
	);
}

export default PaginationElement;
