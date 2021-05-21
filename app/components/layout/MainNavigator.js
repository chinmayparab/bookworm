import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screens/Home'
import DetailsScreen from '../screens/Details'
import { StyleService, useStyleSheet } from '@ui-kitten/components'

const SunIcon = (props) => (
  <Icon {...props} animation='zoom' name='brightness-5' />
)
const MoonIcon = (props) => (
  <Icon {...props} animation='zoom' name='brightness-3' />
)
const HomeIcon = (props) => <Icon {...props} animation='zoom' name='home' />
const CategoryIcon = (props) => (
  <Icon {...props} animation='zoom' name='shape' />
)
const BrandIcon = (props) => <Icon {...props} animation='zoom' name='basket' />
const SettingsIcon = (props) => <Icon {...props} animation='zoom' name='cog' />
const LogoutIcon = (props) => <Icon {...props} animation='zoom' name='logout' />

const { Navigator, Screen } = createStackNavigator()

const MainNavigator = ({ isDark, setDark }) => {
  const styles = useStyleSheet(themedStyles)

  const Header = ({ navigation }) => {
    const handleAuthPress = () => {
      if (user && (user.email || user.phoneNumber)) {
        navigation.navigate('Account')
      } else {
        navigation.navigate('Auth')
      }
    }

    return (
      <>
        <ImageBackground
          style={styles.header}
          source={{ uri: 'https://picsum.photos/400/200' }}
        >
          <Layout style={styles.backdrop}>
            <Button
              style={styles.button}
              appearance='ghost'
              accessoryLeft={isDark ? SunIcon : MoonIcon}
              onPress={() => setDark(!isDark)}
              size='giant'
            />
            <Text style={styles.headerText} category='h3'>
              Bookworm
            </Text>
          </Layout>
        </ImageBackground>
        <TouchableOpacity onPress={handleAuthPress}>
          <Layout level='2' style={styles.auth}>
            <View>
              <Text numberOfLines={1} category='h5'>
                Welcome!
              </Text>
              <Text numberOfLines={1} category='s2'>
                'Sign in for a better experience'
              </Text>
            </View>
          </Layout>
        </TouchableOpacity>
        <Divider />
      </>
    )
  }

  const DrawerContent = ({ navigation, state }) => (
    <Drawer
      selectedIndex={state.index < 5 ? new IndexPath(state.index) : null}
      header={() => <Header navigation={navigation} />}
    >
      <DrawerItem
        title='Home'
        accessoryLeft={HomeIcon}
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem title='Shop By Category' accessoryLeft={CategoryIcon} />
      <DrawerItem title='Shop By Authors' accessoryLeft={BrandIcon} />

      <Divider />
      <DrawerItem title='Settings' accessoryLeft={SettingsIcon} />
      <DrawerItem title='Logout' accessoryLeft={LogoutIcon} />
    </Drawer>
  )
  const HomeNavigator = () => (
    <Navigator
      headerMode='none'
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Screen name='Home' component={HomeScreen} />
      <Screen name='Details' component={DetailsScreen} />
    </Navigator>
  )

  return <HomeNavigator />
}
export default MainNavigator

const themedStyles = StyleService.create({
  header: {
    height: 200,
    resizeMode: 'cover',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 2,
  },
  headerText: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: '#fff',
  },
  auth: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authArrow: {
    height: 30,
  },
})
