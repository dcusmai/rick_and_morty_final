// // const { log } = require('console');
// const http = require('http');
// // const characters = require('../utils/data');
// // const { stringify } = require('querystring');
// const getCharById = require('../controllers/getCharById'); // Me traigo el controlador getCharById
// const getCharDetail = require('../controllers/getCharDetail'); // Me traigo el controlador getCharDetail


// http.createServer((req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*') // Esta línea soluciona el problema de CORS con fetch. Le da permiso al front para que haga peticiones al server.

//     // if(req.url.includes('rickandmorty/character')){
//     //     let id = req.url.split('/').at(-1);
 
//     //     //let characterFilter = characters.filter( char => char.id === Number(id) ); //Funciona OK. Devuelve un nuevo array con el obj que encontró [{}]

//     //     let characterFilter = characters.find( char => char.id === Number(id) ); //Funciona igual que el anterior. Devuelve directamente el obj que encontró {}, pero solo el primero que coincide
//     //     //console.log(characterFilter);

//     //     res
//     //         .writeHead(200, {"Content-type": "application/json"})
//     //         .end(JSON.stringify(characterFilter))
//     // }

//     let id = req.url.split('/').at(-1); // Tomo la url, la separo por "/" y la guardo en un arr, con "at(-1)" me quedo con el último elemento del arr. La dejo afuera de los consicionales para poder usarla cada vez que la necesite.

//     if(req.url.includes('onsearch')) {
//         getCharById(res, id)
//     }

//     if(req.url.includes('detail')) {
//         getCharDetail(res, id)
//     }
    
// }).listen(3001, 'localhost');



// A partir de acá creamos el servidor usando express. Lo anterior es el Server con Node puro.
const express = require("express");
const app = express();
const axios = require('axios');
const cors = require('cors');
const getAllChars = require('../controllers/getAllChars');
const postFav = require('../controllers/postFav');
const getAllFavorites = require('../controllers/getCharById') // El nombre getCharById está mal, tendría que ser getAllFavorites porque el controlador cambió de función. Pero lo dejé así porque lo pedía el ejercicio.
const deleteFavoriteById = require('../controllers/deleteFavoriteById');


app.use(cors()); // Middleware que evita problemas de CORS que antes solucionabamos con la linea de 'Access-Control-Allow-Origin' 
app.use(express.json()); //Nuestro middleware para convertir de json las responses. Nuestro cliente espera un objeto de JS, sino usamos el middleware, se envía un json y no lo reconoce.

app.get('/rickandmorty/allCharacters', async (req, res) => {
    try {
        const allCharacters = await getAllChars();
        res.status(200).json(allCharacters);

    } catch (error) {
        res.status(404).send('Ups! Hubo un problema')
    }
})

app.get('/rickandmorty/character/:id', async (req, res) => {
    
    try{
        const { id } = req.params;
        const response = await axios(`https://rickandmortyapi.com/api/character/${id}`);
        const data = response.data;

        const infoCharacter = {
            id: data.id,
            name: data.name,
            status: data.status,
            species: data.species,
            gender: data.gender,
            image: data.image
        }

        res.status(200).json(infoCharacter);

    } catch(error){
        res.status(404).send(error.message);
    }
})


app.get('/rickandmorty/detail/:detailId', async (req, res) => {

    try {
        const { detailId } = req.params;
        const response = (await axios(`https://rickandmortyapi.com/api/character/${detailId}`)).data; // CIUDADO, tengo que encerrar toda la respuesta que estoy esperando (await) entre () poara luego pedir data, o hacer .data por separado como hice arriba. Si no hago esto, data no encuentra aún la response y devuelve {}.
        //const { data } = await axios(...) // Otra forma, haciendo directamente destructuring y trayendo solo data de la respuesta
        
        const infoCharacterDetail = {
            //id: response.id,
            name: response.name,
            status: response.status,
            species: response.species,
            gender: response.gender,
            origin: response.origin,
            location: response.location,
            image: response.image
        }

        res.status(200).json(infoCharacterDetail);

    } catch(error) {
        res.status(404).send(error.message)
    }
})

//Ya no necesito el arrray Fav. Los va a guardar en la DB
//let fav = []; // fav tiene que ser let, no const, porque lo vamos a estar pisando cada vez que borremos un personaje

app.get('/rickandmorty/fav', async (req, res) => {
    //res.status(200).json(fav);
    try {
        const allFavorites = await getAllFavorites();

        if(allFavorites.error) throw new Error(allFavorites.error);

        res.status(200).json(allFavorites);

    } catch (error) {
        return res.status(404).send(error.message);
    }
})

app.post('/rickandmorty/fav', async (req, res) => {
    //fav.push(req.body);
    console.log('Solicitud post recibida', req.body);
    try {
        const characterFav = await postFav(req.body);
        console.log(characterFav);
        console.log('Enviando POST a:', 'http://localhost:3001/rickandmorty/fav');


        if(characterFav.error) throw new Error(characterFav.error)

        res.status(200).json(characterFav);

    } catch (error) {
        console.log('error en el servidor', error);
        return res.status(404).send(error.message);
    }
})

app.delete('/rickandmorty/fav/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteFavorite = await deleteFavoriteById(parseInt(id));

        if(deleteFavorite.error) throw new Error(deleteFavorite.error);

        return res.status(200).send(deleteFavorite);

    } catch (error) {
        return res.status(404).send(error.message);
    }

    // const { id } = req.params;
    // const favFiltered = fav.filter(char => char.id !== parseInt(id));
    // fav = favFiltered;
    // res.status(200).send('Personaje borrado correctamente')
})

module.exports = app;