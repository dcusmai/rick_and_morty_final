const { Favorite } = require('../DB_Conection');

const postFav = async (character) => {
    try {
        const { id, name, status, species, gender, origin, image } = character;
        
        if( !name || !status || !species || !gender || !image  ) throw new Error("Faltan datos obligatorios");
            // Saqué del if el || !origin => No me está llegando desde el front. Si lo pongo como requerido, se rompe todo
        const newFav = {
            id,
            name,
            status,
            species,
            gender,
            origin,
            image
        }
        // await Favorite.create(newFav); Así estaba originalmente. Lo de abajo me lo sugirió ChatGPT
        // return newFav;

        const result = await Favorite.create(newFav);
        console.log("Resultado de la creación:", result);
        return result;

    } catch (error) {
        return {error: error.message};
    }
}

module.exports = postFav;