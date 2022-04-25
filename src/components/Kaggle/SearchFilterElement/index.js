import React, { Fragment } from 'react';
import { Box, makeStyles, TextField, InputAdornment, MenuItem, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { KAGGLE_URL } from '../../../utils';
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
	},
	fileSizeWrapper: {
		paddingTop: theme.spacing(2)
	},
	rightMargin: {
		marginRight: theme.spacing(0.5)
	},
	button: {
		marginTop: theme.spacing(2)
	}
}));

function SearchFilterElement({ search, setSearch, setUrl, url }) {
	const classes = useStyles();
	const getSelectValue = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.sort;
		return value;
	};
	const getStartSize = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.sizeStart;
		if (value) {
			return value.split(',')[1];
		} else {
			return 'MB';
		}
	};
	const getStartSizeValue = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.sizeStart;
		if (value) {
			return value.split(',')[0];
		} else {
			return '';
		}
	};
	const getEndSize = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.sizeEnd;
		if (value) {
			return value.split(',')[1];
		} else {
			return 'MB';
		}
	};
	const getEndSizeValue = () => {
		const parameters = queryString.parseUrl(url);
		const value = parameters.query.sizeEnd;
		if (value) {
			return value.split(',')[0];
		} else {
			return '';
		}
	};
	const constructUrl = (value) => {
		const parameters = queryString.parseUrl(url);
		parameters.query.sort = value;
		setSelVal(value);
		setUrl(queryString.stringifyUrl(parameters));
	};
	const [ selVal, setSelVal ] = React.useState(getSelectValue());
	const [ startSize, setStartSize ] = React.useState(getStartSize());
	const [ endSize, setEndSize ] = React.useState(getEndSize());
	const [ startSizeValue, setStartSizeValue ] = React.useState(getStartSizeValue());
	const [ endSizeValue, setEndSizeValue ] = React.useState(getEndSizeValue());
	const handleButtonChange = () => {
		const parameters = queryString.parseUrl(url);
		parameters.query.sizeStart = `${startSizeValue},${startSize}`;
		parameters.query.sizeEnd = `${endSizeValue},${endSize}`;
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
											const parameters = queryString.parseUrl(KAGGLE_URL);
											parameters.query.page = 1;
											parameters.query.sort = 'hotness';
											parameters.query.search = search;
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
						<MenuItem value="hotness">Hotness</MenuItem>
						<MenuItem value="votes">Most Votes</MenuItem>
						<MenuItem value="published">New</MenuItem>
						<MenuItem value="updated">Updated</MenuItem>
						<MenuItem value="usability">Usability</MenuItem>
					</TextField>
					<Box className={classes.fileSizeWrapper}>
						<Typography>File Size</Typography>
						<Box>
							<TextField
								value={startSizeValue}
								onChange={(e) => setStartSizeValue(e.target.value)}
								variant="outlined"
								className={classes.rightMargin}
							/>
							<TextField
								value={startSize}
								onChange={(e) => setStartSize(e.target.value)}
								variant="outlined"
								select
							>
								<MenuItem value="KB">KB</MenuItem>
								<MenuItem value="MB">MB</MenuItem>
								<MenuItem value="GB">GB</MenuItem>
							</TextField>
						</Box>
						<Typography className={classes.fileSizeWrapper}>To</Typography>
						<Box className={classes.fileSizeWrapper}>
							<TextField
								value={endSizeValue}
								onChange={(e) => setEndSizeValue(e.target.value)}
								variant="outlined"
								className={classes.rightMargin}
							/>
							<TextField
								value={endSize}
								onChange={(e) => setEndSize(e.target.value)}
								variant="outlined"
								select
							>
								<MenuItem value="KB">KB</MenuItem>
								<MenuItem value="MB">MB</MenuItem>
								<MenuItem value="GB">GB</MenuItem>
							</TextField>
						</Box>
						<Button
							disabled={!startSizeValue || !endSizeValue}
							variant="contained"
							className={classes.button}
							color="primary"
							onClick={handleButtonChange}
						>
							{' '}
							Apply{' '}
						</Button>
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
}

export default SearchFilterElement;
