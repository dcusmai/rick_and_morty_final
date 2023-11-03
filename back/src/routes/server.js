const { log } = require('console');
const http = require('http');
const characters = require('../utils/data');
const { stringify } = require('querystring');


http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // Esta línea soluciona el problema de CORS con fetch. Le da permiso al front para que haga peticiones al server.

    if(req.url.includes('rickandmorty/character')){
        let id = req.url.split('/').at(-1);

        //let characterFilter = characters.filter( char => char.id === Number(id) ); //Funciona OK. Devuelve un nuevo array con el obj que encontró [{}]

        let characterFilter = characters.find( char => char.id === Number(id) ); //Funciona igual que el anterior. Devuelve directamente el obj que encontró {}, pero solo el primero que coincide
        //console.log(characterFilter);

        res
            .writeHead(200, {"Content-type": "application/json"})
            .end(JSON.stringify(characterFilter))
    }
}).listen(3001, 'localhost');