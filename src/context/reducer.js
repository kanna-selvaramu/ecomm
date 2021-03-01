import React, {  } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART, RESET_CART } from "./action.type";

export const cartReducer = (state , action) => {
    switch(action.type) {
        case ADD_TO_CART : 
            return action.payload ? state + action.payload : state + 1;
        case REMOVE_FROM_CART : 
            return action.payload ? state - action.payload : state - 1;
        case RESET_CART: 
            return 0;
    }
}