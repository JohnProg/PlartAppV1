'use strict';

 import React, { Component } from 'react';
 import { Platform, ScrollView, TabBarIOS, Text, View } from 'react-native';

// 3rd Party Libraries
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import CustomTabBar from './CustomTabBar';

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			structure: this.props.structure,
			selectedTab: this.props.selectedTab,
			iconSize: this.props.iconSize ? this.props.iconSize : 30,
			activeTintColor: this.props.activeTintColor ? this.props.activeTintColor : null,
      navigator: this.props.navigator
		}
	}
  onPressButton (tabIndex) {
    this.setState({selectedTab: tabIndex});
  }
  render() {
    	if (Platform.OS == 'android') {
			return(
        <ScrollableTabView
            locked={true}
            style={{backgroundColor: '#FFFFFF'}}
            renderTabBar={()=><CustomTabBar />}
            tabBarPosition={'bottom'}>
            {this.state.structure.map((tabProps, tabIndex) =>
              <View style={{flex:1}}
                  tabLabel={tabProps.title+'!$#'+tabProps.iconName+'!$#'+this.state.iconSize}
                  key={tabIndex}>
                  {tabProps.renderContent()}
              </View>
            )}
          </ScrollableTabView>
     );
   } else {
     return(
         <TabBarIOS tintColor={this.state.activeTintColor}
                translucent={true}>
           {this.state.structure.map((tabProps, tabIndex) =>
             <Icon.TabBarItem title={tabProps.title}
                      iconName={tabProps.iconName}
                      iconSize={this.state.iconSize}
                      selected={tabIndex == this.state.selectedTab}
                      onPress={this.onPressButton.bind(this, tabIndex)}
                      key={tabIndex}>
                 {tabProps.renderContent()}
           </Icon.TabBarItem>
           )}
      </TabBarIOS>
     );
   }

  }
}
