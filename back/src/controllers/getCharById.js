//const axios = require('axios');
const { Favorite } = require('../DB_Conection');

const getAllFavorites = async () => {
    try {
        const allFavorites = await Favorite.findAll();
        
        if(!allFavorites) throw new Error('No hay personajes en Favoritos');

        return allFavorites;

    } catch (error) {
        return {error: error.message};
    }
}

module.exports = getAllFavorites;

// Esto no es necesario al trabajar directamente con la DB. Ya no hacemos requerimientos a una API
// const getCharById = (res, id) => {
//     axios.get(`https://rickandmortyapi.com/api/character/${id}`)
//     .then(response => response.data)
//     .then(data => {
//         let character = {
//             id: data.id,
//             name: data.name,
//             image: data.image,
//             gender: data.gender,
//             species: data.species
//         }
//         res
//         .writeHead(200, { "Content-type": "apllication/json" })
//         .end(JSON.stringify(character))
//     })
//         .catch(error => 
//             res
//             .writeHead(500, { "Content-type": "text/plain" })
//             .end(`El personaje con id: ${id} no fue encontrado`)
//         )
// }
//
//module.exports = getCharById;