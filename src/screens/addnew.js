import React, {useState} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Styles, white, blue} from '../styles';
import API from '../api';

const styles = StyleSheet.create({
  backbtn: {
    padding: 10,
  },
  submitcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  submittxt: {
    color: white,
    fontWeight: '600',
  },
  addPhoto: {
    marginTop: 30,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formcontainer: {
    alignItems: 'center',
  },
  inputcontainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
  },
});

const AddNew = ({navigation}) => {
  const [activity, setActivity] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const goBack = () => {
    // assigning navigation.goBack directly
    // to touchable component does not work
    navigation.goBack();
  };

  const onSubmit = () => {
    setActivity(true);
    // post payload to api
    API.createLaunch({name, description});
    // fake delay
    setTimeout(() => {
      setActivity(false);
      navigation.goBack();
    }, 1200);
  };

  return (
    <View style={Styles.container}>
      <Text style={[Styles.title, {marginTop: 64}]}>ADD NEW LAUNCH</Text>
      <View style={{flex: 1}}>
        <View style={styles.formcontainer}>
          <TouchableOpacity style={[Styles.card, styles.addPhoto]}>
            <Icon name="photo-camera" size={30} />
          </TouchableOpacity>
          <View style={styles.inputcontainer}>
            <TextInput
              style={[
                Styles.input,
                {marginBottom: 20, opacity: activity ? 0.2 : 1},
              ]}
              value={name}
              onChangeText={(txt) => setName(txt)}
              placeholder="Name"
              editable={!activity}
            />
            <TextInput
              style={[Styles.input, {opacity: activity ? 0.2 : 1}]}
              value={description}
              onChangeText={(txt) => setDescription(txt)}
              placeholder="Description"
              editable={!activity}
            />
          </View>
        </View>
        <View style={{flex: 1}} />
        <View style={styles.submitcontainer}>
          <TouchableOpacity style={styles.backbtn} onPress={goBack}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btn} onPress={onSubmit}>
            {!activity ? (
              <Text style={styles.submittxt}>SUBMIT</Text>
            ) : (
              <ActivityIndicator color={white} animating />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

AddNew.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddNew;
