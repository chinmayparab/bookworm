import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const RenderApp = () => <App />;
AppRegistry.registerComponent(appName, () => RenderApp);