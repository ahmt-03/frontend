import React, { Fragment } from 'react';
import { Box, makeStyles, TextField, InputAdornment, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { PAPERS_WITH_CODE_URL } from '../../../utils';
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
		const value = parameters.query.o;
		if (value === 'match') {
			return 'match';
		} else if (value === 'cited') {
			return 'cited';
		} else {
			return 'newest';
		}
	};
	const constructUrl = (value) => {
		const parameters = queryString.parseUrl(url);
		parameters.query.o = value;
		setUrl(queryString.stringifyUrl(parameters));
	};
	const [ selVal, setSelVal ] = React.useState(getSelectValue());
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
										onClick={() => setUrl(`${PAPERS_WITH_CODE_URL}?q=${search}&v=lst&o=match`)}
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
						<MenuItem value="match">Best Match</MenuItem>
						<MenuItem value="cited">Most Cited</MenuItem>
						<MenuItem value="newest">Newest</MenuItem>
					</TextField>
				</Box>
			</Box>
		</Fragment>
	);
}

export default SearchFilterElement;
