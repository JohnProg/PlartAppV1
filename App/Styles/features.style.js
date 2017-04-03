import { Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;
const circleSize = height / 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white'
  },
  title: {
    color: '#5d5d5d',
    fontSize: 20,
    textAlign: 'center'
  },
  featureContainer: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  featureOverlay: {
    justifyContent: 'center',
    height: circleSize,
    width: circleSize,
    backgroundColor: 'rgba(80,94,104,0.7)',
    borderRadius: circleSize / 2,
  },
  feature: {
    height: circleSize,
    margin: 10,
    width: circleSize
  },
  featureImage: {
    height: circleSize,
    width: circleSize
  },
  featureText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center'
  },
});

module.exports = styles;
