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

    // Robust check for required item structure. If the structure is not as expected, 
    // the component logs an error and renders null (or fallback content).
    if (!item || !item.category || !item.filters || !Array.isArray(item.filters)) {
        console.error('Filter data is missing or malformed:', item);
        return null; // Consider rendering fallback content here
    }

    const handleChange = (event) => {
        // ... (keep the existing handleChange function logic)
    };

    return (
        <Fragment key={index}>
            <Box className={classes.root}>
                <Box className={classes.content}>
                    <Typography className={classes.filterName}>{capitalizeWords(item.category)}</Typography>
                    <Box>
                        {item.filters.map((filterItem, idx) => {
                            if (!filterItem || typeof filterItem.filterName !== 'string') {
                                // Log an error if the individual filter item is missing required data
                                console.error('Individual filter item is missing data:', filterItem);
                                return null; // Skip rendering this item
                            }

                            return (
                                <Fragment key={idx}>
                                    <Box>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    // Ensure these properties exist on filterItem or provide alternatives
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
