import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {Styles, blue} from '../styles';

const styles = StyleSheet.create({
  backbtn: {
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: 320,
    height: 320,
  },
  indicatorcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 18,
    fontWeight: '600',
  },
});

const Launch = ({route, navigation}) => {
  const [activity, setActivity] = useState(true);
  const {launch} = route.params;

  const {
    mission_name,
    links: {mission_patch = ''},
  } = launch;

  const onLoadEnd = () => {
    setActivity(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={Styles.container}>
      <Text style={[Styles.title, {marginTop: 64}]}>LAUNCH DETAILS</Text>
      <View style={[Styles.card, {marginVertical: 40}]}>
        <ImageBackground
          source={{uri: mission_patch}}
          style={styles.image}
          onLoadEnd={onLoadEnd}>
          {activity ? (
            <View style={styles.indicatorcontainer}>
              <ActivityIndicator color={blue} style={styles.imageloader} />
            </View>
          ) : null}
          <Text style={styles.name}>{mission_name}</Text>
        </ImageBackground>
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity style={styles.backbtn} onPress={goBack}>
        <Icon name="arrow-back" size={30} />
      </TouchableOpacity>
    </View>
  );
};

Launch.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Launch;
