const { Character } = require( '../DB_Conection' ); //../models/Character // Si lo pongo con el modelo como los tiene dai no guarda los chars en la DB aparentemente y no los muestra en ThunderClient


const getAllChars = async () => {
    try {
        const allCharacters = await Character.findAll();
        return allCharacters;

    } catch (error) {
        return {error: error.message};
    }
}

module.exports = getAllChars;