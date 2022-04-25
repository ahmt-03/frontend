import React, { Fragment } from 'react';
import { Box, makeStyles, TextField, InputAdornment, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { MICROSOFT_RESEARCH_URL } from '../../../utils';
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
		return value;
	};
	const [ selVal, setSelVal ] = React.useState(getSelectValue());
	const constructUrl = (value) => {
		setSelVal(value);
		const parameters = queryString.parseUrl(url);
		parameters.query.sort = value;
		setUrl(queryString.stringifyUrl(parameters));
	};
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
										onClick={() => {
											const parameters = queryString.parseUrl(MICROSOFT_RESEARCH_URL);
											parameters.query.page = 1;
											parameters.query.sort = 'featured';
											parameters.query.term = search;
											setUrl(queryString.stringifyUrl(parameters));
										}}
									/>
								</InputAdornment>
							)
						}}
					/>
					<TextField
						value={selVal}
						onChange={(e) => constructUrl(e.target.value)}
						fullWidth
						variant="outlined"
						select
					>
						<MenuItem value="featured">Featured</MenuItem>
						<MenuItem value="name">Name</MenuItem>
						<MenuItem value="lastModified">Last Modified</MenuItem>
					</TextField>
				</Box>
			</Box>
		</Fragment>
	);
}

export default SearchFilterElement;
