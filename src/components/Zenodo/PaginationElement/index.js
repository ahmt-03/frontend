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
	const fIndex = data.findIndex((item) => item.pageName === '>');
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
		const parameters = queryString.parseUrl(url);
		parameters.query.page = value;
		const newUrl = queryString.stringifyUrl(parameters);
		setPage(value);
		setUrl(newUrl);
	};

	return (
		<Fragment>
			<Box className={classes.root}>
				<Pagination count={fIndex - 2} page={page} onChange={handleChange} />
			</Box>
		</Fragment>
	);
}

export default PaginationElement;
