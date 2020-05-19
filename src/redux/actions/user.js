import {Auth, API, graphqlOperation} from 'aws-amplify';

import {
  SS, ER,
  GET_USER_API,
  CREATE_USER_API,
  LIST_USERS,
} from '../types';
import {getUser, listUsers} from '../../graphql/queries';
import {createUser} from '../../graphql/mutations';

export const getUserApi = (userId) => (dispatch) => ({
  type: GET_USER_API,
  payload: API.graphql(graphqlOperation(getUser, {id: userId})).then(result => {
    console.log('*getUserAPi', result);
    if (result.data.getUser) {
      dispatch({
        type: GET_USER_API + SS,
        payload: result.data.getUser,
      });
    } else {
      console.log('User Not Found!');
      //create user here
    }
  }).catch(e => console.log('Error Get User API: ', e)),
});

export const getAllUsers = () => (dispatch) => ({
  type: LIST_USERS,
  payload: API.graphql(graphqlOperation(listUsers)).then(r => {
    dispatch({
      type: LIST_USERS + SS,
      payload: r.data.listUsers,
    });
  }).catch(e => dispatch({
    type: LIST_USERS + ER,
    payload: e,
  })),
});

export const createUserApi = (user) => (dispatch) => ({
  type: CREATE_USER_API,
  payload: API.graphql(graphqlOperation(createUser, {input: user})).then(result => {
    dispatch({
      type: CREATE_USER_API + SS,
      payload: result.data.createUser,
    });
  }).catch(e => {
    dispatch({
      type: CREATE_USER_API + ER,
      payload: e,
    });
    console.log('Error create user', e);
  }),
});
