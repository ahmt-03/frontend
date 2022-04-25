import React, { Fragment, useState } from 'react';
import SearchBar from 'material-ui-search-bar';
import { makeStyles, Grid, Typography, Box } from '@material-ui/core';
import { useQuery } from 'react-query';
import request from 'superagent';
import { API_ENDPOINT, DATASETSEARCH_URL } from '../../utils';
import DatasetElement from '../../components/DatasetSearch/DatasetElement';
import FilterElement from '../../components/DatasetSearch/FilterElement';
import SearchFilterElement from '../../components/DatasetSearch/SearchFilterElement';
import PaginationElement from '../../components/DatasetSearch/PaginationElement';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';
// import { data } from './output';
import { filters } from './filters';

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

const fetchScraperData = (bodyAttributes) => {
	if (bodyAttributes.url) {
		return request
			.post(`${API_ENDPOINT}/api/datasetsearch/scraper`)
			.send(bodyAttributes)
			.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
			.set('Accept', 'application/json')
			.then((res) => res.body);
	}
};

function DatasetSearch() {
	const classes = useStyles();
	const [ bodyAttributes, setBodyAttributes ] = useState({
		url: '',
		pageNum: 1,
		filters: {
			lastUpdated: 'All',
			downloadFormat: 'All',
			usageRights: 'All',
			topic: 'All',
			free: false
		}
	});
	const [ search, setSearch ] = useState('');
	const { isLoading, data } = useQuery([ `datasetsearch`, bodyAttributes ], () => fetchScraperData(bodyAttributes));
	return (
		<div className={classes.root}>
			<SearchBar
				value={search}
				onChange={(newValue) => {
					setSearch(newValue);
				}}
				onRequestSearch={() => {
					const parameters = queryString.parseUrl(DATASETSEARCH_URL);
					parameters.query.query = search;
					setBodyAttributes({ ...bodyAttributes, url: `${queryString.stringifyUrl(parameters)}` });
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
							<SearchFilterElement
								search={search}
								setSearch={setSearch}
								bodyAttributes={bodyAttributes}
								setBodyAttributes={setBodyAttributes}
							/>
							{filters.map((item, index) => {
								if (item.filterListings.length === 0) {
									return null;
								}
								return (
									<FilterElement
										bodyAttributes={bodyAttributes}
										setBodyAttributes={setBodyAttributes}
										item={item}
										key={index}
									/>
								);
							})}
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={9}>
						<Box className={classes.resultBox}>
							{data.data.map((item, index) => {
								return <DatasetElement item={item} key={index} index={index} />;
							})}
						</Box>
						<Box className={classes.center}>
							<PaginationElement bodyAttributes={bodyAttributes} setBodyAttributes={setBodyAttributes} />
						</Box>
					</Grid>
				</Grid>
			) : bodyAttributes.url ? (
				<Fragment>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} md={3}>
							<Box className={classes.filterBox}>
								<SearchFilterElement
									search={search}
									setSearch={setSearch}
									bodyAttributes={bodyAttributes}
									setBodyAttributes={setBodyAttributes}
								/>
								{filters.map((item, index) => {
									if (item.filterListings.length === 0) {
										return null;
									}
									return (
										<FilterElement
											bodyAttributes={bodyAttributes}
											setBodyAttributes={setBodyAttributes}
											item={item}
											key={index}
										/>
									);
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

export default DatasetSearch;
