import React, { Fragment, useState } from 'react';
import SearchBar from 'material-ui-search-bar';
import { makeStyles, Grid, Typography, Box } from '@material-ui/core';
import { useQuery } from 'react-query';
import request from 'superagent';
import { API_ENDPOINT, MICROSOFT_RESEARCH_URL } from '../../utils';
import DatasetElement from '../../components/MicrosoftResearch/DatasetElement';
import FilterElement from '../../components/MicrosoftResearch/FilterElement';
import SearchFilterElement from '../../components/MicrosoftResearch/SearchFilterElement';
import PaginationElement from '../../components/MicrosoftResearch/PaginationElement';
import CircularProgress from '@material-ui/core/CircularProgress';
import { filters } from './filters';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	},
	resultBox: {
		overflowY: 'scroll',
		maxHeight: '100%',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
	},
	filterBox: {
		width: '80%',
		marginLeft: 'auto',
		[theme.breakpoints.down('sm')]: {
			marginLeft: '0',
			width: '100%'
		}
	},
	center: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: theme.spacing(2)
	},
	centerCircular: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '90vh'
	}
}));

const fetchScraperData = (url) => {
	if (url) {
		return request
			.post(`${API_ENDPOINT}/api/microsoftresearch/scraper`)
			.send({ url })
			.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
			.set('Accept', 'application/json')
			.then((res) => res.body);
	}
};

// count of results
function MicrosoftResearch() {
	const classes = useStyles();
	const [ search, setSearch ] = useState('');
	const [ url, setUrl ] = useState('');
	const { isLoading, data } = useQuery([ `microsoftresearch`, url ], () => fetchScraperData(url));
	return (
		<div className={classes.root}>
			<SearchBar
				value={search}
				onChange={(newValue) => {
					setSearch(newValue);
				}}
				onRequestSearch={() => {
					const parameters = queryString.parseUrl(MICROSOFT_RESEARCH_URL);
					parameters.query.page = 1;
					parameters.query.sort = 'featured';
					parameters.query.term = search;
					setUrl(queryString.stringifyUrl(parameters));
				}}
			/>
			{isLoading ? (
				<Fragment>
					<Box className={classes.centerCircular}>
						<CircularProgress size={50} />
					</Box>
				</Fragment>
			) : data && data.data && data.data.length > 0 ? (
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={3}>
						<Box className={classes.filterBox}>
							<SearchFilterElement search={search} setSearch={setSearch} url={url} setUrl={setUrl} />
							{filters.map((item, index) => {
								if (item.filterListings.length === 0) {
									return null;
								}
								return <FilterElement url={url} setUrl={setUrl} item={item} key={index} />;
							})}
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={9}>
						<Box className={classes.resultBox}>
							{data.data.map((item, index) => {
								if (item.title === '') return null;
								return <DatasetElement item={item} key={index} index={index} url={url} />;
							})}
						</Box>
						<Box className={classes.center}>
							{data.pagination.length > 0 && (
								<PaginationElement url={url} data={data.pagination} setUrl={setUrl} />
							)}
						</Box>
					</Grid>
				</Grid>
			) : url ? (
				<Fragment>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} md={3}>
							<Box className={classes.filterBox}>
								<SearchFilterElement search={search} setSearch={setSearch} url={url} setUrl={setUrl} />
								{filters.map((item, index) => {
									if (item.filterListings.length === 0) {
										return null;
									}
									return <FilterElement url={url} setUrl={setUrl} item={item} key={index} />;
								})}
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} md={9}>
							<Box className={classes.center}>
								<Typography variant="h5">No results found</Typography>
							</Box>
						</Grid>
					</Grid>
				</Fragment>
			) : (
				<Fragment />
			)}
		</div>
	);
}

export default MicrosoftResearch;
