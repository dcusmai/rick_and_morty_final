import { ADD_FAVORITE, DELETE_FAVORITE, FILTER, ORDER } from "./action-types";

const initialState = {
    myFavorites: [],
    //allCharacters: [],
    allFavs: [],
    filterOption: "All" // Agrega un estado para la opción de Filtro ALL
}

const reducer = (state = initialState, {type, payload}) => { // En lugar de pasarle type y payload por destructuring, puedo pasarle action directamente
    switch(type){ // Si no hago destructuring arriba, acá viene action.type
        case ADD_FAVORITE:
            return {
                ...state,
                myFavorites: [...state.myFavorites, payload], // Si no hago destructuring en el reducer, acá viene action.payload
                //allCharacters: [...state.myFavorites], // allCharacters hace una copia del estado myFavorites para que al aplicar el filtrado/ordenamiento no me pise el estado myFavorites.
                allFavs: [...state.allFavs, payload] //Acá tenía state.myFavorites y funcionaba
        };
        
        case DELETE_FAVORITE:
            return{
                ...state,
                myFavorites: state.myFavorites.filter(char => char.id !== payload), // Si no hago destructuring en el reducer, acá viene action.payload
                allFavs: state.allFavs.filter(char => char.id !== payload)
        };

        case FILTER:
            //const { allCharacters } = state; //Hago una copia del estado allCharacters mediante destructuring para no tener que estar escribiendo state.allCharacters varias veces. Dai lo sacó porque nos va a generar problemar en ORDER
            const filterOption = payload;
            const allCharsFiltered = filterOption === "All"
            ? state.allFavs //Acá tenía myFavorites
            : state.allFavs.filter(char => char.gender === payload) // myFavorites
            return{
                ...state,
                filterOption,
                myFavorites: allCharsFiltered, //antes era allFavs en vez de myFavorites
            };
            
        case ORDER:
            const orderedFavorites = [...state.myFavorites];
            return{
                ...state,
                myFavorites: 
                    payload === "Ascendente"
                    ? orderedFavorites.sort((a, b) => a.id > b.id ? 1 : - 1)
                    : payload === "Descendente"
                    ? orderedFavorites.sort((a, b) => a.id > b.id ? -1 : 1)
                    : orderedFavorites //state.myFavorites
            }

        default:
            return {...state}
    }
}


export default reducer;