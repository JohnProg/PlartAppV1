'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Image, Platform } from 'react-native';

export default class ImageLoader extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    }
  }
   handleLoadStart = () => {
     if (!this.state.isLoading) {
       this.setState({isLoading: true});
     }
   }
   handleProgress = (event) => {
    //  const progress = event.nativeEvent.loaded / event.nativeEvent.total;
    //  this.setState({isLoading: progress < 1});
   }
   handleError = (event) => {
     this.setState({isLoading: false});
   }
   handleLoad = (event) => {
     this.setState({isLoading: false});
   }
   render(){
     const { indicatorStyle, style, source } = this.props;
     var content = null;

    if (source && source.uri && this.state.isLoading) {
      content = <ActivityIndicator
          animating={true}
          color={ Platform.OS === 'ios' ? '#673AB7' :  null}
          size={'large'}
          style={indicatorStyle}/>;
    } else {
      content = null;
    }

    return <Image onLoadStart={this.handleLoadStart}
                  onProgress={this.handleProgress}
                  onError={this.handleError}
                  onLoad={this.handleLoad}
                  source={source}
                  style={style}
                  resizeMode={'cover'}>
               {content}
           </Image>
    }
}
