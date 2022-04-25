import React, { useReducer } from 'react';

const initialState = {
	url: ''
};

export const URL_CLICK_CHANGED = 'URL_CLICK_CHANGED';

const reducer = (state, action) => {
	switch (action.type) {
		case URL_CLICK_CHANGED:
			return {
				...state,
				url: action.payload
			};
	}
	return state;
};

const CommonContext = React.createContext();

const CommonProvider = (props) => {
	const [ commonState, dispatch ] = useReducer(reducer, initialState);

	const actions = {
		commonStateChanged: (url) => {
			dispatch({ type: URL_CLICK_CHANGED, payload: url });
		}
	};

	return (
		<CommonContext.Provider
			value={{
				commonState,
				commonActions: actions
			}}
		>
			{props.children}
		</CommonContext.Provider>
	);
};

export { CommonProvider, CommonContext };
