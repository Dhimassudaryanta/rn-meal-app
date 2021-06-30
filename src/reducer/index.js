import { combineReducers } from 'redux';
import rmeal from './rmeal.js';

export default combineReducers({
    meals: rmeal,
});