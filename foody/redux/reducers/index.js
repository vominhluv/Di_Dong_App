import { combineReducers } from "redux";
import modal from "./modal";
import user from './user';
import resDetails from './resDetails';

export default combineReducers({ modal, resDetails, user });