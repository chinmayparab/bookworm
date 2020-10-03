import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {default as theme} from './components/assets/theme.json';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import MainNavigator from './components/layout/MainNavigator';

const App = () => {
  const [isDark, setDark] = useState(false);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider
        {...eva}
        theme={{...eva[isDark ? 'dark' : 'light'], ...theme}}>
        <MainNavigator setDark={setDark} isDark={isDark} />
      </ApplicationProvider>
    </>
  );
};

export default App;
