import React from 'react';
import {ImageBackground, ScrollView, View, Dimensions} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  Button,
  TopNavigation,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const DetailsScreen = ({navigation}) => {
  const styles = useStyleSheet(themedStyles);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <>
      <TopNavigation
        title="MyApp"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.container}>
        <ScrollView>
          <ImageBackground
            style={styles.image}
            source={require('../assets/images/book.jpg')}>
            <Button
              style={styles.wishList}
              size="large"
              appearance="ghost"
              status="danger"
            />
          </ImageBackground>
          <Layout style={styles.detailsContainer} level="1">
            <View>
              <Text style={styles.title} category="h4">
                Milk & Honey
              </Text>
              <Text appearance="hint" category="s1">
                Rupi Kaur
              </Text>
            </View>

            <Divider style={styles.divider} />
            <View>
              <Text appearance="hint">Additional Details</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.actionContainer}>
              <Button
                style={styles.actionButton}
                size="large"
                status="danger"></Button>
              <Button size="large" appearance="ghost" status="info" />
            </View>
          </Layout>
        </ScrollView>
      </Layout>
    </>
  );
};
export default DetailsScreen;
const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  image: {
    height: 500,
    width: Dimensions.get('window').width,
  },
  detailsContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingRight: 10,
  },
  description: {
    marginBottom: 16,
  },
  price: {
    textAlign: 'right',
    textDecorationLine: 'line-through',
    color: 'color-danger-600',
  },
  offerPrice: {
    fontWeight: '700',
  },
  divider: {
    marginVertical: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  sectionLabel: {
    marginVertical: 8,
  },
});
