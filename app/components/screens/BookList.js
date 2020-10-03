import React, {useState, useEffect, useContext, memo} from 'react';

import {useNavigation} from '@react-navigation/native';
import {View, Dimensions, ImageBackground} from 'react-native';
import {
  Card,
  List,
  Text,
  Icon,
  Button,
  Spinner,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

const HeartIcon = (props) => (
  <Icon {...props} animation="zoom" name="heart-outline" />
);
const HeartFilledIcon = (props) => (
  <Icon {...props} animation="zoom" name="heart" />
);

const BookList = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  const handleHeartButton = (item) => {
    if (user) {
      if (extraData.wishlist.some((elem) => elem.key === item.key)) {
        removeFromWishlist(user, extraData.wishlist, item);
      } else {
        addToWishList(user, extraData.wishlist, item);
        showToast('Added to wishlist');
      }
    } else {
      showToast('Sign in to continue');
    }
  };

  const renderItemHeader = () => (
    <ImageBackground
      style={styles.cardHeader}
      source={require('../assets/images/book.jpg')}>
      <Button
        style={styles.wishList}
        size="large"
        appearance="ghost"
        status="danger"
        accessoryLeft={HeartIcon}
      />
    </ImageBackground>
  );

  const renderItemFooter = () => (
    <View style={styles.cardFooter}>
      <Text category="p1">₹ 699</Text>
      <Text style={styles.price} appearance="hint" category="c1">
        ₹ 1200
      </Text>
      <Text style={styles.percentage} category="s2">
        30% OFF
      </Text>
    </View>
  );

  const renderItem = () => {
    return (
      <Card
        style={styles.item}
        header={() => renderItemHeader()}
        footer={() => renderItemFooter()}
        onPress={() => navigation.navigate({name: 'Details'})}>
        <Text category="p1" numberOfLines={2}>
          Milk & Honey
        </Text>
        <Text appearance="hint" category="s2">
          Rupi Kaur
        </Text>
      </Card>
    );
  };

  const data = new Array(8).fill({
    title: 'Item',
  });

  return (
    <List
      style={styles.wrapper}
      numColumns={2}
      contentContainerStyle={styles.container}
      data={data}
      renderItem={renderItem}
      onEndReachedThreshold={1}
    />
  );
};

export default memo(BookList);

const themedStyles = StyleService.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'background-basic-color-3',
  },
  container: {
    paddingHorizontal: 2,
    paddingVertical: 8,
  },
  item: {
    flex: 1,
    margin: 1,
    borderRadius: 1,
    maxWidth: Dimensions.get('window').width / 2 - 3,
  },
  cardHeader: {
    height: 300,
    position: 'relative',
  },
  price: {
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  percentage: {
    color: 'color-danger-600',
    marginLeft: 10,
  },
  wishList: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  spinnerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  nothing: {
    height: Dimensions.get('window').height - 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
