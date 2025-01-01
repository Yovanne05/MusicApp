import {View} from 'react-native';
import React from 'react';
import Search from '../../../components/home/Search';
import {defaultStyles} from '../../../style';

function SearchScreen() {
  return (
    <View style={defaultStyles.container}>
      <Search />
    </View>
  );
}

export default SearchScreen;
