import React, { Fragment } from 'react';
import { Box, makeStyles, TextField, InputAdornment, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ZENODO_URL } from '../../../utils';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		border: '1px solid rgba(0,0,0,.1)',
		borderRadius: theme.spacing(1)
	},
	content: {
		padding: theme.spacing(2)
	},
	searchTextField: {
		marginBottom: theme.spacing(2)
	}
}));

function SearchFilterElement({ search, setSearch, setUrl, url }) {
	const classes = useStyles();
	const getSelectValue = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.sort;
		return value[0] === '-' ? value.slice(1) : value;
	};
	const getOrderValue = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.sort;
		return value[0] === '-' ? 'desc' : 'asc';
	};
	const constructUrl = (value) => {
		const parameters = queryString.parseUrl(url);
		parameters.query.sort = value;
		setUrl(queryString.stringifyUrl(parameters));
	};
	const constructOrderUrl = (value) => {
		const parameters = queryString.parseUrl(url);
		const ogVal = parameters.query.sort;
		parameters.query.sort =
			value === 'asc' ? (ogVal[0] === '-' ? ogVal.slice(1) : ogVal) : ogVal[0] === '-' ? ogVal : `-${ogVal}`;
		setUrl(queryString.stringifyUrl(parameters));
	};
	const [ selVal, setSelVal ] = React.useState(getSelectValue());
	const [ orderVal, setOrderVal ] = React.useState(getOrderValue());
	return (
		<Fragment>
			<Box className={classes.root}>
				<Box className={classes.content}>
					<TextField
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className={classes.searchTextField}
						fullWidth
						variant="outlined"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon
										style={{ cursor: 'pointer' }}
										onClick={() =>
											setUrl(`${ZENODO_URL}?page=1&size=20&q=${search}&sort=bestmatch`)}
									/>
								</InputAdornment>
							)
						}}
					/>
					<TextField
						value={selVal}
						className={classes.searchTextField}
						onChange={(e) => constructUrl(e.target.value)}
						fullWidth
						variant="outlined"
						select
					>
						<MenuItem value="bestmatch">Best Match</MenuItem>
						<MenuItem value="mostviewed">Most Viewed</MenuItem>
						<MenuItem value="mostrecent">Most Recent</MenuItem>
						<MenuItem value="publication_date">Publication Date</MenuItem>
						<MenuItem value="conference_session">Conference Session</MenuItem>
						<MenuItem value="journal">Journal</MenuItem>
						<MenuItem value="version">Version</MenuItem>
					</TextField>
					<TextField
						value={orderVal}
						onChange={(e) => constructOrderUrl(e.target.value)}
						fullWidth
						variant="outlined"
						select
					>
						<MenuItem value="asc">Ascending</MenuItem>
						<MenuItem value="desc">Descending</MenuItem>
					</TextField>
				</Box>
			</Box>
		</Fragment>
	);
}

export default SearchFilterElement;
