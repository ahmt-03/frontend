import React, { Fragment } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { capitalizeFirstLetter, capitalizeWords, toSnakeCase } from '../../../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		border: '1px solid rgba(0,0,0,.1)',
		borderRadius: theme.spacing(1)
	},
	filterName: {
		fontWeight: 'bold',
		marginBottom: theme.spacing(1)
	},
	content: {
		padding: theme.spacing(2)
	},
	filterBox: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(1),
		padding: theme.spacing(1),
		textTransform: 'none'
	}
}));

function FilterElement({ item, index, setUrl, url }) {
    const classes = useStyles();

    if (!item || !item.category || !item.filters || !Array.isArray(item.filters)) {
        return null;
    }

    const handleChange = (event) => {
        if (event.target.checked) {
            setUrl((url += `&${toSnakeCase(item.category)}=${event.target.name}`));
        } else {
            setUrl((url = url.replace(`&${toSnakeCase(item.category)}=${event.target.name}`, '')));
        }
    };

    return (
        <Fragment key={index}>
            <Box className={classes.root}>
                <Box className={classes.content}>
                    <Typography className={classes.filterName}>{capitalizeWords(item.category)}</Typography>
                    <Box>
                        {item.filters.map((filterItem, idx) => {
                            if (!filterItem || typeof filterItem.filterName !== 'string') {
                                return null; // Skip rendering this item
                            }

                            return (
                                <Fragment key={idx}>
                                    <Box>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                  
                                                    checked={filterItem.isChecked || false}
                                                    onChange={handleChange}
                                                    name={filterItem.filterName}
                                                    color="primary"
                                                />
                                            }
                                            label={`${capitalizeFirstLetter(filterItem.filterName)} ${filterItem.filterCount || ''}`} // Provide a fallback if filterTextNumber doesn't exist
                                        />
                                    </Box>
                                </Fragment>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
}

export default FilterElement;
