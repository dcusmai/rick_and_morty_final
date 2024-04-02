const { Favorite } = require('../DB_Conection');

const deleteFavoriteById = async (id) =>{
    try {
        const favoriteFinded = await Favorite.findByPk(id);
        
        if(!favoriteFinded) throw new Error('El personaje favorito que busca no existe');

        favoriteFinded.destroy();

        return  'Personaje eliminado de tus favoritos';

    } catch (error) {
        return {error: error.message};
    }
}

module.exports = deleteFavoriteById;