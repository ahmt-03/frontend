import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Layout from './containers/Layout';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Zenodo from './containers/Zenodo';
import { AuthProvider } from './context/authContext';
import { CommonProvider } from './context/commonContext';
import PapersWithCode from './containers/PapersWithCode';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import DatasetSearch from './containers/DatasetSearch';
import Kaggle from './containers/Kaggle';
import MicrosoftResearch from './containers/MicrosoftResearch';
export const history = createBrowserHistory();
const queryCache = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 30000
		}
	}
});

function App() {
	return (
		<div>
			<QueryClientProvider client={queryCache}>
				<AuthProvider>
					<CommonProvider>
						<Router history={history}>
							<Switch>
								<Layout path="/" exact component={Login} />
								<Layout path="/login" exact component={Login} />
								<Layout path="/signup" exact component={Signup} />
								<Layout path="/1" exact component={Zenodo} />
								<Layout path="/2" exact component={PapersWithCode} />
								<Layout path="/3" exact component={DatasetSearch} />
								<Layout path="/4" exact component={MicrosoftResearch} />
								<Layout path="/5" exact component={Kaggle} />
							</Switch>
						</Router>
					</CommonProvider>
				</AuthProvider>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</div>
	);
}

export default App;
