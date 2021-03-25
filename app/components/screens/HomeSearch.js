import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  Autocomplete,
  AutocompleteItem,
  Icon,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

const movies = [
  {title: 'Star Wars'},
  {title: 'Back to the Future'},
  {title: 'The Matrix'},
  {title: 'Inception'},
  {title: 'Interstellar'},
  {title: 'Don Quixote'},
  {title: 'Lord of the Rings'},
  {title: 'Legend of Zelda'},
  {title: 'Harry Potter and the Sorcerer’s Stone (1997)'},

  {title: 'Harry Potter and the Chamber of Secrets (1998)'},

  {title: 'Harry Potter and the Prisoner of Azkaban (1999)'},

  {title: 'Harry Potter and the Goblet of Fire (2000)'},

  {title: 'Harry Potter and the Order of the Phoenix (2003)'},

  {title: 'Harry Potter and the Half-Blood Prince (2005)'},

  {title: 'Harry Potter and the Deathly Hallows (2007)'},

  {title: 'Harry Potter and the Cursed Child (2016)'},
];

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props) => <Icon {...props} name="star" />;

const HomeSearch = () => {
  const styles = useStyleSheet(themedStyles);
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = (index) => {
    setValue(data[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(movies.filter((item) => filter(item, query)));
  };

  const clearInput = () => {
    setValue('');
    setData(movies);
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} accessoryLeft={StarIcon} />
  );

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name="close" />
    </TouchableWithoutFeedback>
  );

  return (
    <Autocomplete
      style={styles.padder}
      placeholder="Place your Text"
      value={value}
      accessoryRight={renderCloseIcon}
      onChangeText={onChangeText}
      onSelect={onSelect}>
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default HomeSearch;

const themedStyles = StyleService.create({
  padder: {
    padding: 10,
    backgroundColor: 'color-primary-100',
    // margin: 10,
  },
});
