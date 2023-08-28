import { ADD_FAVORITE, DELETE_FAVORITE } from "./action-types";

const initialState = {
    myFavorites: []
}

const reducer = (state = initialState, {type, payload}) => { // En lugar de pasarle type y payload por destructuring, puedo pasarle action directamente
    switch(type){ // Si no hago destructuring arriba, acá viene action.type
        case ADD_FAVORITE:
            return {...state,
            myFavorites:[...state.myFavorites, payload] // Si no hago destructuring en el reducer, acá viene action.payload
        };
        
        case DELETE_FAVORITE:
            return{...state,
            myFavorites: state.myFavorites.filter(char => char.id !== payload) // Si no hago destructuring en el reducer, acá viene action.payload
        };

        default:
            return {...state}
    }
}


export default reducer;