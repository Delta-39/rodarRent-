import { combineReducers } from "redux";
import vehicleReducer from "./vehicleReducer";
import customerReducer from "./customerReducer";
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
    vehicleReducer,
    customerReducer, 
    bookingReducer,
    veh: vehicleReducer, 

});

export default rootReducer;
