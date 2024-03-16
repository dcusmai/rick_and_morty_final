const axios = require('axios');
const { Character } = require('../DB_Conection'); // Traigo a Characters, no de models, sino de lo que exporto en DB_connection cuando hago sequelize.models. Esto contiene un obj de esta forma { Character }. De esta forma puedo utilizar los métodos de sequelize con mis modelos.

// Este archivo se va a encargar de copiar y guardar en la DB, los 100 primeros personajes de la API
const getApiData = async () => { // getApiData es una función asíncrona, que tiene que ir a buscar a la API y se va a demorar. PAra que no se rompa, uso async/await
    try {
        let i = 1;
        let characters = []; // Lo que voy a tener acá con cada llamado que hace el while a la API es lo siguiente: [ Promise<pending>, Promise<pending>, Promise<pending>, Promise<pending>, Promise<pending> ]

        while(i < 6){ // Esto se hace porque los resultados de la API están divididas en páginas con 20 characters en cada una. Necesito traerme las 5 primeras páginas.
            let apiData = await axios(`https://rickandmortyapi.com/api/character?page=${i}`);

            characters.push(apiData) // En el array voy a estar guardando una promesa por cada llamado a la API (aún no tengo los resultados). Voy a tener 5 promesas en estado pending.
            // characters = [...characters, ...apiData.data.results]; //Otra forma de guardar en el [] los characters
            
            i++;
        }

        characters = (await Promise.all(characters)).map(res => res.data.results.map(char => { // Para resolver todas las promesas que tengo en el array characters [Promise<pending>, ...], uso Promise.all. Luego tengo que mapear dos veces: la primera para recorrer la respuesta de cada promesa (5 en total) que son las páginas con 20 characters cada una (while). Cada Promesa, me devuelve un objeto, pero no quiero traer toda la respuesta de Axios (objeto), solo lo que está dentro de la propiedad "data", donde está la respuesta de la API. De data (que también es un objeto), nos interesa quedarnos con la propiedad "results" que es donde está la info que necesitamos y es un array de objetos character [{char}, {char}, ...]. El segundo map, va a recorrer el array results para extraer los datos que quiero de cada character y establecí en mi modelo.
            return({
                id: char.id,
                name: char.name,
                status: char.status,
                species: char.species,
                gender: char.gender,
                origin: char.origin.name,
                image: char.image         
            })
        }))

        // Lo anterior, con los dos maps, me devuelve un array dentro de otro array [[{},{},...]]. Como esto no me sirve, sino que necesito solo el array que contiene los obj character, hago lo siguiente:
        let allCharacters = []; // Creo un nuevo array vacío.
        characters.map(char => { allCharacters = allCharacters.concat(char)}); // Mapeo el resultado de characters, que es un array, de array de objetos: [[{...}, {...}, ...]] al hacer el map, solo tengo el array interior para recorrer (char), pero le aplico un concat a un array vacío [] (allCharacters) y obtengo un solo array de objetos [{...}, {...}, ...].
        return allCharacters;

    } catch (error) {
        return {error: error.message}
    }
}


const saveApiData = async () => { // Esta función lo que hace es guardar la respuesta de getApiData en la DB. Es async porque depende de la respuesta de la API
    try {
        const allCharacters = await getApiData(); // Guarda en una variable la respuesta de la fc getApiData [{},{},...]
        await Character.bulkCreate(allCharacters) //  El método de sequelize bulkCreate, permite guardar en la DB un array con muchos elementos a la vez (allCharacters). Dai hace esto en vez de usar findOrCreate.
        
    } catch (error) {
        return {error: error.message}
    }
}

module.exports =  saveApiData;