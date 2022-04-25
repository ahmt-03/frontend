import React, { Fragment } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2)
	}
}));

function PaginationElement({ bodyAttributes, setBodyAttributes }) {
	const classes = useStyles();
	const handleChange = (event, value) => {
		setBodyAttributes({ ...bodyAttributes, pageNum: value });
	};

	return (
		<Fragment>
			<Box className={classes.root}>
				<Pagination count={bodyAttributes.pageNum + 1} page={bodyAttributes.pageNum} onChange={handleChange} />
			</Box>
		</Fragment>
	);
}

export default PaginationElement;
