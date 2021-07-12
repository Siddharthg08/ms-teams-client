import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import AppStateProvider, {useAppState} from './state';
import * as serviceWorker from './serviceWorker';
import {VideoProvider} from "./components/VideoProvider";
import UnsupportedBrowserWarning from "./components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";
import generateConnectionOptions from "./utils/generateConnectionOptions/generateConnectionOptions";
import CssBaseline from "@material-ui/core/CssBaseline";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import config from './config';
import { AuthProvider } from './contexts/AuthContext';
import Chats from './components/Chats';
import Login from "./components/Login"

//This page is for Routing and react rendering

const basePath = config.appBasePath || "/";

const VideoApp = () => {
    const {setError, settings} = useAppState();
    const connectionOptions = generateConnectionOptions(settings);
// For rendering Main Video 
    return (
        <UnsupportedBrowserWarning>
            <VideoProvider options={connectionOptions} onError={setError}>
                {/*<ErrorDialog dismissError={() => setError(null)} error={error} />*/}
                <App/>
            </VideoProvider>
        </UnsupportedBrowserWarning>
    );
};
// It includes private route, app state provider and authentication
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        {/* <CssBaseline/> */}
        <Router>
        {/* <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider> */}
            <AppStateProvider>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/chats" component={Chats} />
                    <PrivateRoute exact path="/" component={Login} />
                    <PrivateRoute exact path="/room">
                        <VideoApp/>
                    </PrivateRoute>
                    <PrivateRoute exact path={`${basePath}room/:URLRoomName`}>
                        <VideoApp/>
                    </PrivateRoute>
                    <PrivateRoute exact path={`${basePath}room/:URLRoomName/:UserName`}>
                        <VideoApp/>
                    </PrivateRoute>
                    <Redirect to={basePath}/>
                </Switch>
                </AuthProvider>
            </AppStateProvider>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
