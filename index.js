import React from 'react';
import {
  AppRegistry,
  asset,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';

import { Surface } from 'react-360-web';
const surfaceModule = NativeModules.surfaceModule;

import GazeButton from 'react-360-gaze-button';

class InfoPanel extends React.Component {
  state = {
    img: {
      name: 'info.png',
      width: 100,
      height: 100
    }
  };

  transformDisplay(id) {
    this._changeSurfaceDimensions(500, 400, id);
    this.setState({
      img: {
        name: `${id}.jpg`,
        width: 500,
        height: 300
      }
    });
  }

  resetPanel(id) {
    this._changeSurfaceDimensions(100, 100, id);
    this.setState({
      img: {
        name: 'info.png',
        width: 100,
        height: 100
      }
    });
  }

  _changeSurfaceDimensions(width, height, id) {
    surfaceModule.resizeSurface(width, height, id);
  }

  render() {
    let { img } = this.state;

    return (
      <View
        style={styles.displayPanel}
        hitSlop={20}
        onEnter={() => this.transformDisplay(this.props.id)}
        onExit={() => this.resetPanel(this.props.id)}
      >
        <Image
          source={asset(`${img.name}`)}
          style={{ width: img.width, height: img.height }}
        />
        <View style={styles.attractionBox}>
          <Text style={styles.attractionText}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

export default class VR_plantapp extends React.Component {
  render() {
    return (
      <View>
        <Image
          source={asset('banner.png')}
          style={{ width: 500, height: 300 }}
        />
        <View style={styles.attractionBox}>
          <GazeButton
            duration={3000}
            onClick={() => {
              console.log('clicked');
              surfaceModule.start();
            }}
            render={(remainingTime, isGazed) => {
              return (
                <Text style={styles.attractionText}>
                  View here (for 3 sec) to start HandsOn Session
                </Text>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayPanel: {
    width: 100,
    height: 100,
    flexDirection: 'column'
  },
  attractionBox: {
    padding: 20,
    backgroundColor: '#f1f8e9',
    borderColor: '#aed581',
    borderWidth: 2,
    width: 500
  },
  attractionText: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center'
  }
});
AppRegistry.registerComponent('VR_plantapp', () => VR_plantapp);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
