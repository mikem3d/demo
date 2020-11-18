import {StyleSheet, Dimensions} from 'react-native';

export const white = '#ffffff';
export const black = '#000000';
export const red = 'rgb(219, 59, 91)';
export const blue = 'rgb(65, 115, 224)';

export const transparent = 'transparent';

export const {height, width} = Dimensions.get('window');

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    shadowOpacity: 0,
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: black,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  btn: {
    height: 50,
    flex: 1,
    borderRadius: 4,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    padding: 10,
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
  },
});
