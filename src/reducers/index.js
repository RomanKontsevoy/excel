import {combineReducers} from "redux";
import carsReducers from "./cars";

const allReducers = combineReducers({
   cars: carsReducers
});

export default allReducers;