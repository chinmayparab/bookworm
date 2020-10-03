import React from 'react';

import {Divider, TopNavigation} from '@ui-kitten/components';
import BookList from './BookList';
import HomeSearch from './HomeSearch';

export const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <>
      <TopNavigation title="Home" alignment="center" />
      <Divider />
      <HomeSearch />
      <BookList />
    </>
  );
};
