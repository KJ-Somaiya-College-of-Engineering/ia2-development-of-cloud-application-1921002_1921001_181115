import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, UPDATE_ITEM } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());

    axios.get('http://shoppinglist-env.eba-mewsnumb.ap-south-1.elasticbeanstalk.com:8081/')
    .then(res => {
        dispatch({
            type:GET_ITEMS,
            payload: res.data
        })
    })
    .catch(err => {
        returnErrors(err.response.data, err.response.status);
    });
}


export const addItem = (item) => (dispatch, getState) => {

    axios.post('http://shoppinglist-env.eba-mewsnumb.ap-south-1.elasticbeanstalk.com:8081/', item, tokenConfig(getState))
    .then(res => dispatch({
        type:ADD_ITEM,
        payload:res.data
    }))
    .catch(err => {
        returnErrors(err.response.data, err.response.status);
    });
}




export const updateItem = (id, name) => (dispatch, getState) => {
    axios.put(`http://shoppinglist-env.eba-mewsnumb.ap-south-1.elasticbeanstalk.com:8081/${id}`,{ name }, tokenConfig(getState))
    .then(res => dispatch({
        type:UPDATE_ITEM,
        payload: {
            id, name
        }
    }))
    .catch(err => {
        returnErrors(err.response.data, err.response.status);
    });
}


export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`http://shoppinglist-env.eba-mewsnumb.ap-south-1.elasticbeanstalk.com:8081/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type:DELETE_ITEM,
        payload: id
    }))
    .catch(err => {
        returnErrors(err.response.data, err.response.status);
    });
}


export const setItemsLoading = () => {
    return{
        type:ITEMS_LOADING
    };
}