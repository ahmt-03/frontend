import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../components/Header';
import { AuthContext } from '../../context/authContext';
import { CommonContext } from '../../context/commonContext';
import { API_ENDPOINT, forwardTo } from '../../utils';
import request from 'superagent';

function Layout(props) {
	const Component = props.component;
	const { authActions } = React.useContext(AuthContext);
	const { commonState, commonActions } = React.useContext(CommonContext);
	let time;
	useEffect(
		() => {
			if (!props.path.includes('signup')) {
				request
					.post(`${API_ENDPOINT}/api/auth/me`)
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
					.then((res) => {
						if (res.status === 200) {
							authActions.authStateChanged(res.body);
						} else {
							authActions.authStateChanged(null);
							forwardTo('/login');
						}
					})
					.catch((err) => {
						authActions.authStateChanged(null);
						forwardTo('/login');
					});
			}
		},
		[ Component ]
	);
	const handleTimeChange = () => {
		if (document.visibilityState === 'hidden') {
			time = new Date().getTime();
		} else {
			const timeDiff = new Date().getTime() - time;
			let url = commonState.url;
			if (url !== '') {
				request
					.post(`${API_ENDPOINT}/api/time/urlClicked`)
					.send({ url, time: timeDiff / 1000 })
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
					.then(() => {
						commonActions.commonStateChanged('');
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};
	useEffect(
		() => {
			document.addEventListener('visibilitychange', handleTimeChange);
			return () => {
				document.removeEventListener('visibilitychange', handleTimeChange);
			};
		},
		[ commonState ]
	);
	return (
		<Fragment>
			<Header {...props} />
			<Component />
		</Fragment>
	);
}

export default Layout;
