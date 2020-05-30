import React, {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';
import Dashboard from 'react-native-dashboard';

import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {Container, Content, Left, Right} from 'native-base';
import Header from '../Header';
import {connect} from 'react-redux';
import {signOut} from '../../redux/actions/auth';

const Menu = props => {
  const {authUser} = props;
  const {title, navigation} = props;
  const {dispatch, signOut} = props;
  const card = el => {
    if(el.value == 'signout')
    {
      dispatch(signOut())
    }
    else
    {
     navigation.navigate(el.value);
    }
  };

  const items = [
    { name: 'Customers', value: 'Customers', background: '#74D4DE', icon: 'user' },
    { name: 'Product', value: 'ProductMain', background: '#76EE00', icon: 'lemon' },
    { name: 'Inventory', value: 'Inventory', background: '#FEC001', icon: 'warehouse' },
    { name: 'Orders', value: 'Orders', background: '#FC8369', icon: 'shopping-bag' },
    { name: 'Home Page', value: 'Home', background: '#9932CC', icon: 'home' },
    { name: 'SignOut', value: 'signout', background: '#778899', icon: 'sign-out-alt' },
  ];
  return (
      <Container>
         <View style={styles.container}>
                <Dashboard items={items} background={true} card={card} column={2} />
              </View>
      </Container>
  );
};

const style = StyleSheet.create({
  list: {
    height: 40,
    padding: 10,
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});

export default connect(state => ({
  authUser: state.auth.authUser
  }), dispatch => ({
  dispatch,
  signOut
}))(Menu);
