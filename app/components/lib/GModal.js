
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  ScrollView,
  View,
} from 'react-native';

import GView from './GView';

import {
  paddingM,
  paddingS,
  modalBackgroundColor,
  modalBorderColor,
  modalShadow,
} from '../../constants/baseStyles';

const styles = StyleSheet.create({
  defaults: {
    position: 'absolute',
    top: paddingM * 2,
    left: paddingM,
    right: paddingM,
    bottom: paddingM,
    backgroundColor: modalBackgroundColor,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: modalBorderColor,
    ...modalShadow,
  },

  closeModalWrapper: {
    position: 'absolute',
    right: paddingS,
    top: paddingS,
  },
  closeModalText: {
    fontSize: 18,
  },

  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
});

export default class extends Component {
  static propTypes = {
    children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    open: PropTypes.bool.isRequired,
    scrollEnabled: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
  }
  static defaultProps = {
    style: null,
    children: [],
    scrollEnabled: true,
  }

  render() {
    if (!this.props.open) {
      return null;
    }

    const style = [styles.defaults];

    Object.keys(this.props).forEach((prop) => {
      if (this.props[prop]) {
        style.push(styles[prop]);
      }
    });
    if (this.props.style) {
      style.push(this.props.style);
    }

    const overlay = (
      <TouchableHighlight style={styles.overlay} onPress={this.props.onRequestClose} >
        <View />
      </TouchableHighlight>
    );

    const closeButton = (
      <TouchableHighlight
        style={styles.closeModalWrapper}
        onPress={this.props.onRequestClose}
      >
        <Text style={styles.closeModalText}>X</Text>
      </TouchableHighlight>
    );

    return (
      <GView style={styles.wrapper}>
        {overlay}
        <GView style={style}>
          <ScrollView
            style={styles.scrollView}
            scrollEnabled={this.props.scrollEnabled}
          >
            {this.props.children}
          </ScrollView>
          {closeButton}
        </GView>
      </GView>
    );
  }
}