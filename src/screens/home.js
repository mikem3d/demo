import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import API from '../api';
import {Styles, white, blue} from '../styles';

const styles = StyleSheet.create({
  listcontainer: {
    marginTop: 20,
    flex: 1,
    width: '100%',
  },
  listitem: {
    height: 80,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listimage: {
    width: 40,
    height: 40,
  },
  addnew: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: blue,
    borderRadius: 30,
    width: 60,
    height: 60,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const opacity = new Animated.Value(0);

let stopAnimation = false;

const cycleAnimation = () => {
  Animated.sequence([
    Animated.timing(opacity, {
      toValue: 0.2,
      duration: 800,
      easing: Easing.easeInEaseOut,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 0,
      duration: 800,
      easing: Easing.easeInEaseOut,
      useNativeDriver: true,
    }),
  ]).start(() => {
    if (!stopAnimation) {
      cycleAnimation();
    }
  });
};

const Home = ({navigation}) => {
  const [activity, setActivity] = useState(true);
  const [launchData, setLaunchData] = useState(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      const result = await API.getLaunches();
      setActivity(false);
      // stop cycleAnimation from running forever, eating memory
      stopAnimation = true;
      setLaunchData(result);
    };
    cycleAnimation();
    fetchLaunches();
  }, []);

  const onAddNew = () => {
    navigation.navigate('addnew');
  };

  const onLaunch = (launch) => {
    navigation.navigate('launch', {launch});
  };

  return (
    <View style={Styles.container}>
      <Text style={[Styles.title, {marginTop: 64}]}>LAUNCH LIST</Text>
      <View style={styles.listcontainer}>
        {activity ? (
          <>
            <Animated.View
              style={[
                Styles.card,
                styles.listitem,
                {backgroundColor: '#AAA', opacity},
              ]}
            />
            <Animated.View
              style={[
                Styles.card,
                styles.listitem,
                {backgroundColor: '#AAA', opacity},
              ]}
            />
            <Animated.View
              style={[
                Styles.card,
                styles.listitem,
                {backgroundColor: '#AAA', opacity},
              ]}
            />
          </>
        ) : (
          <FlatList
            data={launchData}
            renderItem={({item}) => {
              const {
                mission_name,
                links: {mission_patch_small = ''},
              } = item;
              const onpress = () => {
                onLaunch(item);
              };
              return (
                <TouchableOpacity
                  style={[Styles.card, styles.listitem]}
                  onPress={onpress}>
                  <Image
                    source={{uri: mission_patch_small}}
                    style={styles.listimage}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '200',
                      }}>
                      {mission_name}
                    </Text>
                  </View>
                  <Icon name="arrow-forward-ios" size={15} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={
              (item) => `${item.launch_date_unix}${item.flight_number}` // getting repeated keys
            }
            contentContainerStyle={{padding: 20}}
          />
        )}
      </View>
      <TouchableOpacity onPress={onAddNew} style={styles.addnew}>
        <Icon name="add" size={35} color={white} />
      </TouchableOpacity>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
